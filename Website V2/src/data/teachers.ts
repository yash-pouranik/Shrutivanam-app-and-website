export interface Teacher {
  slug: string;
  name: string;
  subject: string;
  subjectHi: string;
  credentials: string;
  bio: string;
  photo: string;
  courseSlug: string;
}

export const teachers: Teacher[] = [
  {
    slug: "priyansh",
    name: "Priyansh Dwivedi",
    subject: "Vedic Mathematics",
    subjectHi: "वैदिक गणित",
    credentials: "M.Tech, IISc Bangalore | NTPC Varanasi",
    bio: "Priyansh brings the ancient brilliance of Vedic sutras to life through structured, modern instruction. With an engineering background from IISc Bangalore and years of independent study in Vedic traditions, he bridges the gap between ancient numerical wisdom and contemporary mathematical thinking.",
    photo: "/teachers/priyansh.png",
    courseSlug: "vedic-maths",
  },
  {
    slug: "deepak",
    name: "Deepak Gupta",
    subject: "Yoga",
    subjectHi: "योग",
    credentials: "M.Tech, IISc Bangalore | NTPC Vellore",
    bio: "Deepak's journey with yoga began as a personal practice and evolved into a deep study of classical texts and traditions. Trained as an engineer at IISc Bangalore, he approaches yoga with both scientific rigor and spiritual sensitivity, offering a rare blend of authenticity and accessibility.",
    photo: "/teachers/deepak.png",
    courseSlug: "yoga",
  },
  {
    slug: "atul",
    name: "Atul",
    subject: "Sanskrit",
    subjectHi: "संस्कृत",
    credentials: "M.Tech, IIT Guwahati",
    bio: "Atul's love for Sanskrit began with a fascination for the Vedas and grew into a scholarly pursuit through years of dedicated practice. With technical precision from IIT Guwahati and a deep reverence for the language, he makes Sanskrit approachable for modern learners without sacrificing its depth.",
    photo: "/teachers/atul.png",
    courseSlug: "sanskrit",
  },
  {
    slug: "priyanka",
    name: "Priyanka Gherani",
    subject: "Indian Philosophy",
    subjectHi: "भारतीय दर्शन",
    credentials: "Senior Analyst | Vedic Philosophy Scholar",
    bio: "Priyanka brings a rare combination of analytical sharpness and spiritual depth to the study of Indian philosophy. Drawing from the Bhagavad Gita, Upanishads, and Bhakti traditions, she guides students from intellectual understanding to lived wisdom with clarity, warmth, and insight.",
    photo: "/teachers/priyanka.png",
    courseSlug: "philosophy",
  },
];

export function getTeacherBySlug(slug: string): Teacher | undefined {
  return teachers.find((t) => t.slug === slug);
}
