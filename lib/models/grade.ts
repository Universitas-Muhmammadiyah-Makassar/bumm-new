export interface Subject {
  id: string
  name: string
  grade: string
}

export interface Semester {
  id: string
  name: string
  subjects: Subject[]
}

export interface SchoolData {
  schoolName: string
  schoolAddress: string
  graduationYear: string
  majorStudy: string
  semesters: Semester[]
}

export function calculateAverageGrade(semesters: Semester[]): string {
  let totalGrade = 0
  let totalSubjects = 0

  semesters.forEach((semester) => {
    semester.subjects.forEach((subject) => {
      if (subject.grade && !isNaN(Number(subject.grade))) {
        totalGrade += Number(subject.grade)
        totalSubjects++
      }
    })
  })

  if (totalSubjects === 0) return "0"

  const average = totalGrade / totalSubjects
  return average.toFixed(2)
}
