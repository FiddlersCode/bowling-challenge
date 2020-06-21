import {Scorecard} from "../src/scorecard"
import {Frame, IFrame} from "../src/frame";
import {setFrame} from "./testHelpers";



describe(`Scorecard`, () => {
    let scorecard: Scorecard;
    beforeEach(() => {
        scorecard = new Scorecard();
    })
    let ss = 100;

    describe(`ss${ss}: addFrame()`, () => {
        let i = 10;
        it(`ss${ss}.T${i} adding a frame`, () => {
            const rolls = [3, 3]
            const frame: IFrame = {
                rolls,
                isStrike() {},
                isSpare() {},
                getTotalFrameScore() {}
            }
            scorecard.addFrame(frame)
            expect(scorecard.getFrames()[0].rolls).toEqual(rolls)
        });
    })
    ss += 100
    describe(`ss${ss}: calculateFrameScore()`, () => {
        let i = 10;
        const params = [
            {
                rolls: [3, 3],
                expected: 6
            },
            {
                rolls: [5, 4],
                expected: 9
            },
            {
                rolls: [0, 0],
                expected: 0
            },
            {
                rolls: [10, 10, 10],
                expected: 30
            },
            {
                rolls: [1, 9, 10],
                expected: 20
            }
        ]
        it(`ss${ss}.T${i}calculates a frame's score with 2 rolls`, () => {
            params.forEach((param) => {
                const frame: Frame = new Frame()
                frame.setRolls(param.rolls)
                scorecard.addFrame(frame)
                const score = scorecard.calculateFrameScore(frame)
                expect(score).toEqual(param.expected)
            })
        });

        i += 10;
        it(`ss${ss}.T${i}calculates a frame's score with 3 rolls`, () => {
            params.forEach((param) => {
                const frame: Frame = new Frame()
                frame.setRolls(param.rolls)
                scorecard.addFrame(frame)
                const score = scorecard.calculateFrameScore(frame)
                expect(score).toEqual(param.expected)
            })
        });
    })

    ss += 100
    describe(`ss${ss}: calculateBonus()`, () => {
        let i = 10;
        it(`ss${ss}.T${i}calculates the bonus score with a strike and a normal roll`, () => {
            setFrame(scorecard, [10]);
            setFrame(scorecard, [5, 3])
            const bonusScore = scorecard.calculateBonusScore(0)
            expect(bonusScore).toEqual(8)
        });

        i += 10;
        it(`ss${ss}.T${i}calculates the bonus score with a strike and a strike`, () => {
            setFrame(scorecard, [10]);
            setFrame(scorecard, [10])
            setFrame(scorecard, [3, 2])
            const bonusScore = scorecard.calculateBonusScore(0)
            expect(bonusScore).toEqual(13)
        });

        i += 10;
        it(`ss${ss}.T${i}calculates the bonus score with 3 consecutive strikes`, () => {
            setFrame(scorecard, [10]);
            setFrame(scorecard, [10])
            setFrame(scorecard, [10])
            setFrame(scorecard, [3, 2])
            const bonusScore = scorecard.calculateBonusScore(0)
            expect(bonusScore).toEqual(20)
        });

        i += 10;
        it(`ss${ss}.T${i}calculates the bonus score with a strike and a spare`, () => {
            setFrame(scorecard, [10]);
            setFrame(scorecard, [5, 5])
            const bonusScore = scorecard.calculateBonusScore(0)
            expect(bonusScore).toEqual(10)
        });

        i += 10;
        it(`ss${ss}.T${i}calculates the bonus score with a spare and a normal roll`, () => {
            setFrame(scorecard, [5, 5]);
            setFrame(scorecard, [5, 3])
            const bonusScore = scorecard.calculateBonusScore(0)
            expect(bonusScore).toEqual(5)
        });

        i += 10;
        it(`ss${ss}.T${i}calculates the bonus score with a spare and a normal roll`, () => {
            setFrame(scorecard, [5, 5]);
            setFrame(scorecard, [5, 3])
            const bonusScore = scorecard.calculateBonusScore(0)
            expect(bonusScore).toEqual(5)
        });
    })

    ss += 100
    describe(`ss${ss}: calculateTotalScore()`, () => {
        let i = 10;
        it(`ss${ss}.T${i} gutter game`, () => {
            const rolls = [
               [0, 0],
               [0, 0],
               [0, 0],
               [0, 0],
               [0, 0],
               [0, 0],
               [0, 0],
               [0, 0],
               [0, 0],
               [0, 0]
            ]
            rolls.forEach((roll) => {
                setFrame(scorecard, roll)
            })
            const totalScore = scorecard.calculateTotalScore()
            expect(totalScore).toEqual(0)
        });
        i += 10;
        it(`ss${ss}.T${i} game with no bonuses`, () => {
            const rolls = [
               [3, 2],
               [3, 2],
               [3, 2],
               [3, 2],
               [3, 2],
               [3, 2],
               [3, 2],
               [3, 2],
               [3, 2],
               [3, 2],
            ]
            rolls.forEach((roll) => {
                setFrame(scorecard, roll)
            })
            const totalScore = scorecard.calculateTotalScore()
            expect(totalScore).toEqual(50)
        });
        i += 10;
        it(`ss${ss}.T${i} game with strike`, () => {
            const rolls = [
                [10],
                [3, 2],
                [3, 2],
                [3, 2],
                [3, 2],
                [3, 2],
                [3, 2],
                [3, 2],
                [3, 2],
                [3, 2],
            ]
            rolls.forEach((roll) => {
                setFrame(scorecard, roll)
            })
            const totalScore = scorecard.calculateTotalScore()
            expect(totalScore).toEqual(60)
        });

        i += 10;
        it(`ss${ss}.T${i} near-perfect game`, () => {
            const rolls = [
                [10],
                [10],
                [10],
                [10],
                [10],
                [10],
                [10],
                [10],
                [10],
                [1, 9, 10],
            ]
            rolls.forEach((roll) => {
                setFrame(scorecard, roll)
            })
            const totalScore = scorecard.calculateTotalScore()
            expect(totalScore).toEqual(271)
        });

        i += 10;
        it(`ss${ss}.T${i} perfect game`, () => {
            const rolls = [
                [10],
                [10],
                [10],
                [10],
                [10],
                [10],
                [10],
                [10],
                [10],
                [10, 10, 10],
            ]
            rolls.forEach((roll) => {
                setFrame(scorecard, roll)
            })
            const totalScore = scorecard.calculateTotalScore()
            expect(totalScore).toEqual(300)
        });
    })
});
