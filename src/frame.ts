import {scoreRangeError} from "./errors";

export interface IFrame {
    rolls: number[];

    isStrike();

    isSpare();

    getTotalFrameScore();
}

export class Frame implements IFrame {
    rolls: number[] = [0, 0]
    private minScore: number = 0
    private maxScore: number = 10

    getRolls = () => {
        return this.rolls
    }

    setRolls = (scores: number[]) => {
        if (this.scoresOutOfRange(scores)) {
            throw scoreRangeError
        }
        return this.rolls = scores
    }
    isStrike = () => {
        return this.rolls[0] === this.maxScore
    }

    isSpare = () => {
        return this.rolls[0] !== this.maxScore &&
            this.rolls[0] + this.rolls[1] == this.maxScore
    }

    getTotalFrameScore = () => {
        return this.rolls.reduce((a, b) => {
            return a + b
        });
    }

    private isTooHigh = (score: number) => {
        return score > this.maxScore
    }

    private isTooLow = (score: number) => {
        return score < this.minScore
    }

    private scoreOutOfRange = (score: number) => {
        return this.isTooHigh(score) ? true : this.isTooLow(score)
    }
    private scoresOutOfRange = (scores: number[]): Boolean => {
        return scores.some(this.scoreOutOfRange)
    }
}