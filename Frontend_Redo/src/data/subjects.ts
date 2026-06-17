import { type Subject, type Chapter } from './types';
import { biologyDiseasesMCQs } from './mcqs/biologyDiseases';
import { historyRevoltsMCQs } from './mcqs/historyRevolts';

const createMockChapter = (id: string, title: string, mcqs: any[] = []): Chapter => ({
  id,
  title,
  mcqs,
  totalMcqs: mcqs.length > 0 ? mcqs.length : 0,
  attempted: 0,
  wrong: 0,
  bookmarked: 0,
  progressLevel: 'Not Started'
});

export const subjectsData: Subject[] = [
  {
    id: "history",
    title: "History",
    icon: "solar:hourglass-bold",
    subSubjects: [
      {
        id: "hist-ancient",
        title: "Ancient India",
        chapters: [
          createMockChapter("hist-anc-1", "Prehistoric Period: Paleolithic, Mesolithic, and Neolithic"),
          createMockChapter("hist-anc-2", "Chalcolithic Period: The Copper Age"),
          createMockChapter("hist-anc-3", "Indus Valley Civilization: Harappan Civilization"),
          createMockChapter("hist-anc-4", "Early Vedic Period: Rigvedic Age"),
          createMockChapter("hist-anc-5", "Later Vedic Period"),
          createMockChapter("hist-anc-6", "Vedic Literature: Vedas, Upanishads, and Vedangas"),
          createMockChapter("hist-anc-7", "Rise of Buddhism"),
          createMockChapter("hist-anc-8", "Rise of Jainism"),
          createMockChapter("hist-anc-9", "16 Mahajanapadas & the Rise of Magadha"),
          createMockChapter("hist-anc-10", "Early Dynasties: Haryanka, Shishunaga, and Nanda"),
          createMockChapter("hist-anc-11", "Foreign Invasions: Iranian and Macedonian"),
          createMockChapter("hist-anc-12", "Mauryan Empire: Administration, Ashoka's Edicts, and Art"),
          createMockChapter("hist-anc-13", "Post-Mauryan Native Dynasties: Shunga, Kanva, and Satavahana"),
          createMockChapter("hist-anc-14", "Post-Mauryan Foreign Dynasties: Indo-Greeks, Shakas"),
          createMockChapter("hist-anc-15", "Sangam Age: Cheras, Cholas, Pandyas"),
          createMockChapter("hist-anc-16", "Gupta Empire: The Golden Age"),
          createMockChapter("hist-anc-17", "Post-Gupta Period & Harshavardhana Dynasty"),
        ]
      },
      {
        id: "hist-medieval",
        title: "Medieval India",
        chapters: [
          createMockChapter("hist-med-1", "Delhi Sultanate: Origins & Period (1206–1526)"),
          createMockChapter("hist-med-2", "Vijayanagara Empire: 1336–1565 AD"),
          createMockChapter("hist-med-3", "Mughal Empire: Origins & Foundation"),
          createMockChapter("hist-med-4", "Mughal Empire Summary: 1600–1857"),
          createMockChapter("hist-med-5", "Maratha State: 1674–1720"),
          createMockChapter("hist-med-6", "Cultural Movements: Bhakti & Sufi Movements"),
        ]
      },
      {
        id: "hist-modern",
        title: "Modern India",
        chapters: [
          createMockChapter("hist-mod-1", "Advent of Europeans"),
          createMockChapter("hist-mod-2", "Social and Religious Reform Movements"),
          createMockChapter("hist-mod-3", "The 1857 Revolt"),
          createMockChapter("hist-mod-4", "Indian National Congress (INC)"),
          createMockChapter("hist-mod-5", "Partition of Bengal"),
          createMockChapter("hist-mod-6", "Emergence of Mahatma Gandhi"),
          createMockChapter("hist-mod-7", "Socialism & Revolutionary Movements"),
          createMockChapter("hist-mod-8", "Quit India Movement"),
          createMockChapter("hist-mod-9", "Peasant and Tribal Uprisings", historyRevoltsMCQs), // Wired to actual MCQs
        ]
      }
    ]
  },
  {
    id: "geography",
    title: "Geography",
    icon: "solar:earth-bold",
    subSubjects: [
      {
        id: "geo-physical",
        title: "Physical & World Geography",
        chapters: [
          createMockChapter("geo-phys-1", "Solar System"),
          createMockChapter("geo-phys-2", "Fundamentals of Earth"),
          createMockChapter("geo-phys-3", "Earth's Interior & Plate Tectonics"),
          createMockChapter("geo-phys-4", "Rocks, Continents, and Oceans"),
          createMockChapter("geo-phys-5", "Geomorphology & Landforms"),
          createMockChapter("geo-phys-6", "Atmosphere & Water in the Atmosphere"),
          createMockChapter("geo-phys-7", "Winds, Climate & Ocean Currents"),
        ]
      },
      {
        id: "geo-indian",
        title: "Indian Geography",
        chapters: [
          createMockChapter("geo-ind-1", "India & Its Boundaries"),
          createMockChapter("geo-ind-2", "Himalayas & Related Geography"),
          createMockChapter("geo-ind-3", "Northern Plains of India"),
          createMockChapter("geo-ind-4", "Peninsular River Systems"),
          createMockChapter("geo-ind-5", "Drainage Systems of India"),
          createMockChapter("geo-ind-6", "Dam Systems in India"),
          createMockChapter("geo-ind-7", "Climate & Monsoon System of India"),
          createMockChapter("geo-ind-8", "Soil and Agriculture"),
          createMockChapter("geo-ind-9", "Forests & Grasslands"),
          createMockChapter("geo-ind-10", "Conservation Sites & Protected Areas of India"),
        ]
      }
    ]
  },
  {
    id: "biology",
    title: "Biology",
    icon: "solar:dna-bold",
    chapters: [
      createMockChapter("bio-1", "Cell Cycle & Growth Phases"),
      createMockChapter("bio-2", "Animal Tissues"),
      createMockChapter("bio-3", "The Hierarchy of Classification"),
      createMockChapter("bio-4", "Animal Kingdom"),
      createMockChapter("bio-5", "Life Processes"),
      createMockChapter("bio-6", "Nutrition in Animals and Plants"),
      createMockChapter("bio-7", "Human Heart and Circulatory System"),
      createMockChapter("bio-8", "Nervous System"),
      createMockChapter("bio-9", "Glands and Hormones"),
      createMockChapter("bio-10", "Reproduction"),
      createMockChapter("bio-11", "Heredity and Evolution"),
      createMockChapter("bio-12", "Diseases", biologyDiseasesMCQs), // Wired to actual MCQs
    ]
  },
  {
    id: "polity",
    title: "Polity",
    icon: "solar:diploma-bold",
    chapters: [
      createMockChapter("pol-1", "Indian Constitution & Constituent Assembly"),
      createMockChapter("pol-2", "Salient Features of the Indian Constitution"),
      createMockChapter("pol-3", "Preamble of the Indian Constitution"),
      createMockChapter("pol-4", "Part III: Fundamental Rights (Articles 12–35)"),
      createMockChapter("pol-5", "Directive Principles of State Policy (DPSP)"),
      createMockChapter("pol-6", "Part V: The Union Government (Articles 52–151)"),
      createMockChapter("pol-7", "Prime Minister of India: Articles 74–78"),
      createMockChapter("pol-8", "Parliament of India: Articles 79–122"),
      createMockChapter("pol-9", "Part VI: Overview of State Legislature"),
      createMockChapter("pol-10", "Emergency Provisions: Articles 352–360"),
      createMockChapter("pol-11", "Supreme Court (SC)"),
      createMockChapter("pol-12", "Panchayati Raj System"),
      createMockChapter("pol-13", "Constitutional Bodies"),
      createMockChapter("pol-14", "Important Acts: Timeline and Key Features"),
    ]
  },
  {
    id: "economics",
    title: "Economics",
    icon: "solar:chart-square-bold",
    subSubjects: [
      {
        id: "eco-macro",
        title: "Core Macroeconomics & Financial System",
        chapters: [
          createMockChapter("eco-mac-1", "Indian Economy Basics"),
          createMockChapter("eco-mac-2", "Banking & Finance"),
          createMockChapter("eco-mac-3", "Budget & Taxation"),
        ]
      },
      {
        id: "eco-markets",
        title: "Policies, Global Markets & Trends",
        chapters: [
          createMockChapter("eco-mar-1", "Economic Policies & Planning"),
          createMockChapter("eco-mar-2", "International Economy & Institutions"),
          createMockChapter("eco-mar-3", "Current Economic Affairs & Schemes"),
        ]
      }
    ]
  },
  {
    id: "static-gk",
    title: "Static GK",
    icon: "solar:library-bold",
    subSubjects: [
      {
        id: "gk-core",
        title: "Core Subject Revisions",
        chapters: [
          createMockChapter("gk-cor-1", "Indian Polity & Constitution"),
          createMockChapter("gk-cor-2", "Indian History"),
          createMockChapter("gk-cor-3", "Geography"),
          createMockChapter("gk-cor-4", "Indian Economy & Schemes"),
          createMockChapter("gk-cor-5", "Science & Technology"),
          createMockChapter("gk-cor-6", "Environment & Ecology"),
        ]
      },
      {
        id: "gk-culture",
        title: "Culture, Sports & Miscellaneous",
        chapters: [
          createMockChapter("gk-cul-1", "Art & Culture"),
          createMockChapter("gk-cul-2", "Sports & Personalities"),
          createMockChapter("gk-cul-3", "International Organizations"),
          createMockChapter("gk-cul-4", "Miscellaneous Facts & Tricks"),
        ]
      }
    ]
  }
];
