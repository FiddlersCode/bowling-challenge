import {IFrame} from "./frame";

export class Scorecard {
    private frames: IFrame[] = []

    addFrame = (frame: IFrame) => { this.frames.push(frame) }

    getFrames = () => { return this.frames }

    calculateFrameScore = (frame: IFrame) => {
        return frame.rolls.reduce((a, b) => { return a + b });
    }

    calculateBonusScore = (frameNumber: number) => {
        if (frameNumber == 9) { return 0 }
        const frame = this.frames[frameNumber]
        const nextFrame = this.frames[frameNumber + 1]

        if (frameNumber < 8 && frame.isStrike() && nextFrame.isStrike()) {
            return nextFrame.getTotalFrameScore() + this.frames[frameNumber + 2].rolls[0]
        }

        if (frameNumber == 8 && frame.isStrike()) {
            return nextFrame.rolls[0] + nextFrame.rolls[1]
        }

        if (frame.isStrike()) { return nextFrame.getTotalFrameScore() }

        if (frame.isSpare()) { return nextFrame.rolls[0] }
        return 0
    }

    calculateTotalScore = () => {
        const frameScores = this.getFrameScores()
        const bonusScores = this.getBonusScores()
        return Scorecard.getTotalFrameScores(frameScores) + Scorecard.getTotalBonusScores(bonusScores);
    }


    private static getTotalBonusScores(bonusScores: (number)[]) {
        return bonusScores.reduce((a, b) => { return a + b });
    }

    private static getTotalFrameScores(frameScores: number[]) {
        return frameScores.reduce((a, b) => { return a + b });
    }

    private getFrameScores() {
        return this.frames.map((frame) => { return this.calculateFrameScore(frame) });
    }

    private getBonusScores() {
        return this.frames.map((frame, index) => { return this.calculateBonusScore(index) });
    }
}