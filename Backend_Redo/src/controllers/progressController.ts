import { Response } from 'express';
import { Request } from 'express'; // Base Express type
import  User  from '../models/User'; // Adjust path based on your structure

// Extend Express Request to support your Auth Middleware's req.user payload
interface AuthRequest<Params = {}, ResBody = {}, ReqBody = {}> extends Request<Params, ResBody, ReqBody> {
  user?: {
    id: string;
    [key: string]: any;
  };
}

// Request body shape interface for toggling
interface BookmarkRequestBody {
  mcqId?: string;
}

// Interface for what the frontend will send us
interface SubmitQuizBody {
  chapterId: string;
  totalAttempted: number;
  totalCorrect: number;
  newlyWrongIds?: string[];
  newlyCorrectIds?: string[];
}

/**
 * Toggle a specific MCQ in the user's bookmarks array
 */
export const toggleBookmark = async (
  req: AuthRequest<{}, {}, BookmarkRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { mcqId } = req.body;
    const userId = req.user?.id;

    // Guard clause: ensure authentication middleware worked
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. User session missing." });
    }

    // Guard clause: ensure an MCQ ID was passed
    if (!mcqId) {
      return res.status(400).json({ message: "Missing mcqId in request body." });
    }

    // Fetch the target user document
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User profile not found." });
    }

    // Explicitly treat bookmarks array elements as strings for safety checks
    const isBookmarked = user.bookmarks.some((id: any) => id.toString() === mcqId);

    if (isBookmarked) {
      // Remove it if it exists
      user.bookmarks = user.bookmarks.filter((id: any) => id.toString() !== mcqId);
    } else {
      // Add it if it is missing
      user.bookmarks.push(mcqId as any);
    }

    // Persist modifications back to MongoDB
    await user.save();

    return res.status(200).json({
      message: isBookmarked ? "Bookmark removed successfully" : "Bookmark added successfully",
      bookmarksCount: user.bookmarks.length,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error during bookmark toggle";
    return res.status(500).json({ message: errorMessage });
  }
};

/**
 * Fetch dashboard details alongside full populated bookmark references
 */
export const getDashboard = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. User session missing." });
    }

    // Use .populate to turn an array of ObjectIDs into fully fetched MCQ documents
    const user = await User.findById(userId).populate('bookmarks');
    
    if (!user) {
      return res.status(404).json({ message: "User profile not found." });
    }

    // Mask sensitive parameters like password hashes before sending payload to client
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      bookmarks: user.bookmarks, // Now holds an array of actual MCQ objects
      dailyActivity: user.dailyActivity,      // <--- ADD THIS LINE
      chapterProgress: user.chapterProgress 
    };

    return res.status(200).json(userResponse);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error while loading dashboard";
    return res.status(500).json({ message: errorMessage });
  }
};

export const resetProgress = async (
  req: AuthRequest<{}, {}, { chapterIds: string[] }>,
  res: Response
): Promise<Response> => {
  try {
    const { chapterIds } = req.body;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized." });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Filter out the chapterIds that are being reset
    user.chapterProgress = user.chapterProgress.filter(
      (cp) => !chapterIds.includes(cp.chapterId)
    );

    await user.save();
    return res.status(200).json({ chapterProgress: user.chapterProgress });
  } catch (error) {
    return res.status(500).json({ message: "Error resetting progress" });
  }
};





/**
 * Submit quiz results to update Chapter Progress and Daily Streaks
 */
  export const submitQuiz = async (
  req: AuthRequest<{}, {}, SubmitQuizBody>,
  res: Response
): Promise<Response> => {
  try {
    const { chapterId, totalAttempted, totalCorrect, newlyWrongIds, newlyCorrectIds } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized." });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const totalWrong = totalAttempted - totalCorrect;

    // --- 1. UPDATE CHAPTER PROGRESS ---
    // Look for the chapter in their progress array
    const chapterIndex = user.chapterProgress.findIndex(cp => cp.chapterId === chapterId);
    
    if (chapterIndex >= 0) {
      // If found, add to their existing numbers
      user.chapterProgress[chapterIndex].attempted += totalAttempted;
      
      // Pull correct ones
      if (newlyCorrectIds && newlyCorrectIds.length > 0) {
        user.chapterProgress[chapterIndex].wrongQuestionIds = user.chapterProgress[chapterIndex].wrongQuestionIds.filter(
          id => !newlyCorrectIds.includes(id.toString())
        );
      }
      
      // Push wrong ones (avoiding duplicates)
      if (newlyWrongIds && newlyWrongIds.length > 0) {
        for (const id of newlyWrongIds) {
          if (!user.chapterProgress[chapterIndex].wrongQuestionIds.some(existing => existing.toString() === id)) {
            user.chapterProgress[chapterIndex].wrongQuestionIds.push(id as any);
          }
        }
      }
      
      // Set wrong to length of array
      user.chapterProgress[chapterIndex].wrong = user.chapterProgress[chapterIndex].wrongQuestionIds.length;
    } else {
      // If not found, push a brand new record
      user.chapterProgress.push({
        chapterId,
        attempted: totalAttempted,
        wrong: newlyWrongIds ? newlyWrongIds.length : totalWrong,
        wrongQuestionIds: (newlyWrongIds || []) as any
      });
    }

    // --- 2. UPDATE DAILY ACTIVITY (STREAK) ---
    // Get today's date in YYYY-MM-DD format (e.g. "2026-06-17")
    const todayStr = new Date().toISOString().split('T')[0];
    
    const activityIndex = user.dailyActivity.findIndex(da => da.date === todayStr);

    if (activityIndex >= 0) {
      // If they already studied today, add to today's numbers
      user.dailyActivity[activityIndex].attempted += totalAttempted;
      user.dailyActivity[activityIndex].correct += totalCorrect;
    } else {
      // First time studying today! Create a new date entry
      user.dailyActivity.push({
        date: todayStr,
        attempted: totalAttempted,
        correct: totalCorrect
      });
    }

    // Save everything!
    await user.save();

    return res.status(200).json({
      message: "Quiz results saved successfully!",
      dailyActivity: user.dailyActivity,
      chapterProgress: user.chapterProgress
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error saving quiz";
    return res.status(500).json({ message: errorMessage });
  }
};
