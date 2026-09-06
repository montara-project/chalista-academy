import type { IconName } from '@/components/block/common/icons'

export type Topic = {
  slug: string
  title: string
  /** Deskripsi singkat untuk dropdown & kartu */
  short: string
  /** Deskripsi lengkap untuk halaman detail */
  description: string
  icon: IconName
  /** Poin-poin materi yang akan dipelajari */
  outline: string[]
}

export const theoryTopics: Topic[] = [
  {
    slug: 'tenses',
    title: 'Tenses',
    short: '16 bentuk waktu kalimat beserta polanya',
    description:
      'Kuasai 16 bentuk tenses bahasa Inggris — mulai dari Simple Present hingga Future Perfect Continuous. Setiap tense dijelaskan dengan pola rumus, fungsi, kata kunci waktu (time signals), dan contoh kalimat dalam konteks sehari-hari.',
    icon: 'hourglass',
    outline: [
      'Present Tense (Simple, Continuous, Perfect, Perfect Continuous)',
      'Past Tense (Simple, Continuous, Perfect, Perfect Continuous)',
      'Future Tense (Simple, Continuous, Perfect, Perfect Continuous)',
      'Pola kalimat verbal & nominal di tiap tense',
      'Kata kunci waktu (time signals) sebagai penanda tense',
      'Latihan membentuk kalimat di tiap tense',
    ],
  },
  {
    slug: 'modal-auxiliary-verbs',
    title: 'Modal & Auxiliary Verbs',
    short: 'Modal verbs & kata kerja bantu (be, do, have)',
    description:
      'Pahami perbedaan modal verbs (can, could, may, might, must, shall, should, will, would) dan auxiliary verbs (be, do, have) — mulai dari fungsi, pola kalimat, hingga kesalahan umum yang sering terjadi.',
    icon: 'puzzle',
    outline: [
      'Modal verbs: can, could, may, might, must',
      'Modal verbs: shall, should, will, would',
      'Auxiliary verbs: be, do, have',
      'Modal + kata kerja dasar (modal + V1)',
      'Kalimat negatif & tanya dengan modal/auxiliary',
      'Kesalahan umum penggunaan modal & auxiliary',
    ],
  },
  {
    slug: 'seom',
    title: 'SEOM',
    short: 'Pola & struktur penyusunan kalimat',
    description:
      'Pelajari pola penyusunan kalimat bahasa Inggris yang benar — bagaimana elemen-elemen kalimat dirangkai secara runtut agar terdengar natural dan mudah dipahami.',
    icon: 'layout-template',
    outline: [
      'Urutan elemen dalam sebuah kalimat',
      'Pola kalimat verbal & nominal',
      'Menyusun kalimat sederhana',
      'Mengembangkan kalimat menjadi lebih kompleks',
      'Kesalahan umum dalam penyusunan kalimat',
    ],
  },
  {
    slug: 'ada',
    title: 'ADA (Articles, Determiners, Adjective)',
    short: 'Articles (a, an, the), determiners, & adjective',
    description:
      'Kenali articles (a, an, the), determiners (this, that, my, some, …), dan adjectives — tiga elemen penting untuk melengkapi dan menjelaskan nomina dalam kalimat bahasa Inggris.',
    icon: 'notebook-pen',
    outline: [
      'Indefinite article: a & an',
      'Definite article: the',
      'Zero article: kapan tanpa article',
      'Determiners: this, that, these, those, my, some, many, …',
      'Posisi & urutan adjective dalam kalimat',
      'Latihan penggunaan articles, determiners, & adjective',
    ],
  },
  {
    slug: 'comparative-degree',
    title: 'Comparative Degree',
    short: 'Positive, comparative, & superlative',
    description:
      'Pelajari cara membandingkan sesuatu dalam bahasa Inggris melalui positive, comparative, dan superlative degree — termasuk aturan perubahan ejaan dan penggunaan "than" serta "the … of/in".',
    icon: 'chart-column',
    outline: [
      'Positive degree: kalimat tanpa perbandingan',
      'Comparative degree: membandingkan dua hal (-er / more … than)',
      'Superlative degree: membandingkan lebih dari dua hal (the … -est / the most …)',
      'Perubahan ejaan adjective beraturan & tidak beraturan',
      'Kesalahan umum dalam comparative & superlative',
    ],
  },
  {
    slug: 'gerund',
    title: 'Gerund',
    short: 'Kata kerja bentuk -ing yang berfungsi sebagai nomina',
    description:
      'Pahami kapan kata kerja berubah menjadi bentuk -ing (gerund) dan berfungsi sebagai noun — baik sebagai subjek, objek, maupun pelengkap kalimat. Termasuk daftar verb yang diikuti gerund.',
    icon: 'refresh-cw',
    outline: [
      'Gerund sebagai subjek kalimat',
      'Gerund sebagai objek kalimat',
      'Gerund setelah preposisi',
      'Verb yang diikuti gerund (enjoy, finish, avoid, …)',
      'Gerund vs infinitive: apa bedanya?',
    ],
  },
]

export const practiceTopics: Topic[] = [
  {
    slug: 'question',
    title: 'Question',
    short: 'Yes/no questions, WH-questions, & tag questions',
    description:
      'Latih kemampuanmu membentuk pertanyaan dalam bahasa Inggris — mulai dari yes/no questions, WH-questions (what, where, when, why, who, how), hingga tag questions. Dilengkapi contoh dan latihan soal.',
    icon: 'circle-help',
    outline: [
      'Yes/No questions dengan to be & auxiliary',
      'WH-questions: what, where, when, why, who, how',
      'Tag questions: …, isn’t it? / …, don’t they?',
      'Pertanyaan dengan modal verbs',
      'Latihan soal membentuk pertanyaan',
    ],
  },
  {
    slug: 'statement',
    title: 'Statement',
    short: 'Kalimat pernyataan positif & negatif',
    description:
      'Latih kemampuanmu membentuk kalimat pernyataan (statement) yang benar — baik kalimat positif (affirmative) maupun negatif (negative) — dalam berbagai tenses.',
    icon: 'message-square',
    outline: [
      'Kalimat pernyataan positif (affirmative)',
      'Kalimat pernyataan negatif (negative)',
      'Pernyataan dalam berbagai tenses',
      'Mengubah question menjadi statement',
      'Latihan soal membentuk pernyataan',
    ],
  },
]

export function getTheoryTopic(slug: string): Topic | undefined {
  return theoryTopics.find((topic) => topic.slug === slug)
}

export function getPracticeTopic(slug: string): Topic | undefined {
  return practiceTopics.find((topic) => topic.slug === slug)
}
