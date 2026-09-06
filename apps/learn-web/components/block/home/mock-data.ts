export const stats = [
  { icon: 'book-open', value: '6', label: 'Topik teori grammar' },
  { icon: 'target', value: '2', label: 'Kategori latihan' },
  { icon: 'hourglass', value: '16', label: 'Bentuk tenses dibahas' },
  { icon: 'layers', value: '30+', label: 'Poin materi & latihan' },
] as const

export const features = [
  {
    icon: 'book-open',
    tint: 'bg-muted text-primary',
    title: 'Teori yang runtut',
    desc: 'Setiap topik dipecah menjadi materi ringkas berurutan, jadi kamu tahu harus mulai dari mana dan melangkah ke mana.',
  },
  {
    icon: 'pen-line',
    tint: 'bg-secondary/50 text-accent',
    title: 'Banyak contoh nyata',
    desc: 'Setiap aturan disertai contoh kalimat yang sering dipakai sehari-hari — bukan cuma rumus yang menggantung.',
  },
  {
    icon: 'target',
    tint: 'bg-secondary/30 text-primary',
    title: 'Langsung praktik',
    desc: 'Uji pemahamanmu lewat latihan pertanyaan dan pernyataan setelah membaca teori, supaya materi benar-benar nempel.',
  },
  {
    icon: 'clock',
    tint: 'bg-muted text-accent',
    title: 'Akses kapan saja',
    desc: 'Belajar menurut tempomu sendiri — buka kapan pun, dari perangkat apa pun, tanpa perlu mendaftar.',
  },
] as const

export const heroChips = ['Tanpa perlu mendaftar', 'Contoh kalimat lengkap', 'Latihan interaktif']
