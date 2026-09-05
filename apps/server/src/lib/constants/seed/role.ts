const ID_ADMIN = '01a070d4-d0ae-7051-9380-1e327fe377ea'
const ID_INSTRUCTOR = '01a070d4-d0ae-7051-9380-2185154d17ae'
const ID_STUDENT = '01a070d4-d0ae-7051-9380-253bc2f9bc21'

export const ROLE_SEED = {
  ADMIN: ID_ADMIN,
  INSTRUCTOR: ID_INSTRUCTOR,
  STUDENT: ID_STUDENT,
} as const

// 'student', 'instructor', 'admin'
export const ROLE_DATA = [
  {
    id: ROLE_SEED.ADMIN,
    name: 'Admin',
  },
  {
    id: ROLE_SEED.INSTRUCTOR,
    name: 'Instructor',
  },
  {
    id: ROLE_SEED.STUDENT,
    name: 'Student',
  },
]
