
export const careers = [
    {
      id: "data-analyst",
      title: "Data Analyst",
      category: "Data Science",
      description: "Analyze data to identify trends and support decisions.",
      skills: {
        Python: 3,
        SQL: 4,
        Statistics: 4,
        "Data Visualization": 4,
        Communication: 3,
      },
      interests: ["Data Science", "Business Analytics"],
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      category: "Data Science",
      description: "Build statistical and machine learning models.",
      skills: {
        Python: 4,
        Statistics: 5,
        "Machine Learning": 4,
        SQL: 3,
      },
      interests: ["Data Science", "Artificial Intelligence"],
    },
    {
      id: "frontend-developer",
      title: "Frontend Developer",
      category: "Software Development",
      description: "Build interactive websites and user interfaces.",
      skills: {
        JavaScript: 4,
        React: 4,
        "HTML & CSS": 4,
        Communication: 3,
      },
      interests: ["Software Development"],
    },
    {
      id: "ml-engineer",
      title: "Machine Learning Engineer",
      category: "Artificial Intelligence",
      description: "Develop and deploy machine learning solutions.",
      skills: {
        Python: 5,
        "Machine Learning": 5,
        Statistics: 4,
        "Cloud Computing": 3,
      },
      interests: ["Artificial Intelligence", "Data Science"],
    },
    {
      id: "security-analyst",
      title: "Cybersecurity Analyst",
      category: "Cybersecurity",
      description: "Protect systems and investigate security threats.",
      skills: {
        Cybersecurity: 5,
        Python: 3,
        "Cloud Computing": 3,
        Communication: 3,
      },
      interests: ["Cybersecurity"],
    },
    {
      id: "cloud-engineer",
      title: "Cloud Engineer",
      category: "Cloud Computing",
      description: "Build and maintain cloud infrastructure.",
      skills: {
        "Cloud Computing": 5,
        Python: 3,
        Cybersecurity: 3,
        "Project Management": 3,
      },
      interests: ["Cloud Computing", "Software Development"],
    },
  ];
  
  export function calculateMatches(userSkills, userInterests) {
    return careers
      .map((career) => {
        const requirements = Object.entries(career.skills);
  
        const skillScore =
          requirements.reduce((total, [skill, requiredLevel]) => {
            const userLevel = Number(userSkills[skill] || 0);
            return total + Math.min(userLevel / requiredLevel, 1);
          }, 0) / requirements.length;
  
        const interestScore = career.interests.some((interest) =>
          userInterests.includes(interest)
        )
          ? 1
          : 0;
  
        const matchScore = Math.round(
          (skillScore * 0.75 + interestScore * 0.25) * 100
        );
  
        const missingSkills = requirements
          .filter(([skill, level]) => Number(userSkills[skill] || 0) < level)
          .map(([skill, level]) => ({
            name: skill,
            requiredLevel: level,
            currentLevel: Number(userSkills[skill] || 0),
          }));
  
        return {
          ...career,
          matchScore,
          missingSkills,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }
  