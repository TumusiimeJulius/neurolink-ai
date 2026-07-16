"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictLearning = predictLearning;
function predictLearning(subject) {
    let predictedMastery = subject.mastery;
    let risk = "Low";
    let recommendedStudyHours = 2;
    if (subject.mastery < 50) {
        predictedMastery = Math.min(subject.mastery + 20, 100);
        risk = "High";
        recommendedStudyHours = 10;
    }
    else if (subject.mastery < 80) {
        predictedMastery = Math.min(subject.mastery + 12, 100);
        risk = "Medium";
        recommendedStudyHours = 6;
    }
    else {
        predictedMastery = Math.min(subject.mastery + 5, 100);
        risk = "Low";
        recommendedStudyHours = 3;
    }
    const confidence = Math.min(95, Math.round(70 + subject.mastery * 0.25));
    return {
        subject: subject.subject,
        currentMastery: subject.mastery,
        predictedMastery,
        risk,
        recommendedStudyHours,
        confidence
    };
}
