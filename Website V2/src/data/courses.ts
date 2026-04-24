export interface CourseModule {
  title: string;
}

export interface Course {
  slug: string;
  title: { en: string; hi: string };
  description: string;
  longDescription: string;
  duration: string;
  level: string;
  teacher: string;
  teacherSlug: string;
  icon: string;
  color: string;
  modules: CourseModule[];
  highlights: string[];
  seoKeyword: string;
}

export const courses: Course[] = [
  {
    slug: "vedic-maths",
    title: { en: "Vedic Mathematics", hi: "वैदिक गणित" },
    description:
      "Unlock the ancient power of Vedic sutras to perform complex calculations with speed, elegance, and mental clarity.",
    longDescription:
      "Vedic Mathematics is a system of mathematics derived from the ancient Indian scriptures known as the Vedas. These powerful techniques allow students to solve complex mathematical problems with remarkable speed and accuracy using simple mental tricks and sutras. Whether you are a student preparing for competitive exams or a curious learner, this course will transform how you think about numbers.",
    duration: "8 Weeks",
    level: "Beginner to Intermediate",
    teacher: "Priyansh Dwivedi",
    teacherSlug: "priyansh",
    icon: "🧮",
    color: "from-orange-100 to-orange-200",
    modules: [
      { title: "Introduction to Vedic Sutras" },
      { title: "Fast Addition & Subtraction" },
      { title: "Multiplication Tricks" },
      { title: "Division Techniques" },
      { title: "Squares, Cubes & Roots" },
      { title: "Algebra Basics through Vedic Methods" },
    ],
    highlights: [
      "10x faster mental calculation",
      "Sutras rooted in Vedic tradition",
      "Applicable to competitive exams",
      "Suitable for all age groups",
    ],
    seoKeyword: "Vedic Maths course online",
  },
  {
    slug: "yoga",
    title: { en: "Yoga", hi: "योग" },
    description:
      "Discover the complete science of yoga — from postures and breathwork to meditation and the philosophy that underpins it all.",
    longDescription:
      "This course presents yoga in its complete, authentic form — not just physical postures, but the holistic science of body, mind, and spirit. Drawing from Patanjali's Yoga Sutras, the Hatha Yoga Pradipika, and classical texts, our course integrates asanas, pranayama, meditation, and yogic philosophy into a unified practice that nourishes the whole person.",
    duration: "10 Weeks",
    level: "All Levels",
    teacher: "Deepak Gupta",
    teacherSlug: "deepak",
    icon: "🧘",
    color: "from-indigo-100 to-indigo-200",
    modules: [
      { title: "Foundations of Yoga Philosophy" },
      { title: "Asanas — Body as Temple" },
      { title: "Pranayama — The Art of Breathing" },
      { title: "Meditation — Stillness in Motion" },
      { title: "Yamas & Niyamas — Ethical Living" },
      { title: "Integrating Yoga into Daily Life" },
    ],
    highlights: [
      "Ancient classical yoga, not just fitness",
      "Philosophy + practice combined",
      "Guided by an expert from IISc Bangalore",
      "Practical techniques for modern life",
    ],
    seoKeyword: "Yoga philosophy course India",
  },
  {
    slug: "sanskrit",
    title: { en: "Sanskrit", hi: "संस्कृत" },
    description:
      "Learn Sanskrit — the mother of languages — from Devanagari script to reading sacred texts and conversational practice.",
    longDescription:
      "Sanskrit is not merely a language — it is the vehicle of an entire civilization's wisdom. This beginner-friendly course starts from the alphabet and systematically builds up to reading classic texts. You will explore Devanagari script, grammar essentials, vocabulary, and the beauty of Sanskrit prose and poetry, enabling you to engage directly with the original spiritual literature of India.",
    duration: "12 Weeks",
    level: "Beginner",
    teacher: "Atul",
    teacherSlug: "atul",
    icon: "📜",
    color: "from-amber-100 to-amber-200",
    modules: [
      { title: "Devanagari Script — Reading & Writing" },
      { title: "Grammar Essentials — Sandhi & Vibhakti" },
      { title: "Core Vocabulary Building" },
      { title: "Reading Simple Sanskrit Texts" },
      { title: "Introduction to Sanskrit Literature" },
      { title: "Conversational Sanskrit Basics" },
    ],
    highlights: [
      "Begin from absolute zero",
      "Read original Vedic & classical texts",
      "Taught by an IIT Guwahati graduate",
      "Grammar made approachable and logical",
    ],
    seoKeyword: "Learn Sanskrit for beginners",
  },
  {
    slug: "philosophy",
    title: { en: "Indian Philosophy", hi: "भारतीय दर्शन" },
    description:
      "Explore timeless wisdom on the nature of the Self, karma, consciousness, and the purpose of human existence through the lens of Vedic philosophy.",
    longDescription:
      "This course is an invitation to look within. Drawing from the Bhagavad Gita, Upanishads, and teachings of great Vedic philosophers, it explores the deepest questions of human existence: Who am I? What is the purpose of life? How should I act? These are not abstract questions — they have practical answers that transform how we live, think, and relate to the world.",
    duration: "10 Weeks",
    level: "All Levels",
    teacher: "Priyanka Gherani",
    teacherSlug: "priyanka",
    icon: "🕉️",
    color: "from-rose-100 to-rose-200",
    modules: [
      { title: "Nature of the Self — Atman vs. Body" },
      { title: "The Law of Karma" },
      { title: "Cycle of Birth & Death — Samsara" },
      { title: "Purpose of Human Life — Dharma" },
      { title: "Mind, Ego & Consciousness" },
      { title: "Introduction to Bhakti — The Path of Devotion" },
      { title: "Insights from the Bhagavad Gita" },
      { title: "Applying Vedic Wisdom in Daily Life" },
    ],
    highlights: [
      "ISKCON-inspired, universally accessible",
      "Rooted in Bhagavad Gita & Upanishads",
      "Practical application of ancient wisdom",
      "No prior philosophical background needed",
    ],
    seoKeyword: "Spiritual education platform India",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
