import {Scorecard} from "../src/scorecard"
import {Frame, IFrame} from "../src/frame";
import {setFrame} from "./testHelpers";
import {cannotCalculateBonusError} from "../src/errors";



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
            }
        ]
        it(`ss${ss}.T${i}calculates a frame's score`, () => {
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
            const bonusScore = scorecard.calculateBonusScore(1)
            expect(bonusScore).toEqual(8)
        });

        i += 10;
        it(`ss${ss}.T${i}calculates the bonus score with a strike and a strike`, () => {
            setFrame(scorecard, [10]);
            setFrame(scorecard, [10])
            const bonusScore = scorecard.calculateBonusScore(1)
            expect(bonusScore).toEqual(10)
        });

        i += 10;
        it(`ss${ss}.T${i}calculates the bonus score with a strike and a spare`, () => {
            setFrame(scorecard, [10]);
            setFrame(scorecard, [5, 5])
            const bonusScore = scorecard.calculateBonusScore(1)
            expect(bonusScore).toEqual(10)
        });

        i += 10;
        it(`ss${ss}.T${i}calculates the bonus score with a spare and a normal roll`, () => {
            setFrame(scorecard, [5, 5]);
            setFrame(scorecard, [5, 3])
            const bonusScore = scorecard.calculateBonusScore(1)
            expect(bonusScore).toEqual(5)
        });

        i += 10;
        it(`ss${ss}.T${i} throws an error when given the first frame`, () => {
            setFrame(scorecard, [8]);
            expect(() => {
                scorecard.calculateBonusScore(0)
            }).toThrow(cannotCalculateBonusError)
        });
    })

    ss += 100
    xdescribe(`ss${ss}: handleFinalFrame()`, () => {
        let i = 10;
        it(`ss${ss}.T${i} 9th frame spare`, () => {
            const rolls = [
                [3, 5],
                [3, 5],
                [3, 5],
                [3, 5],
                [3, 5],
                [3, 5],
                [3, 5],
                [3, 5],
                [5, 5],
                [10, 10, 10],
            ]
            setFrame(scorecard, [10]);
            setFrame(scorecard, [5, 3])
            const bonusScore = scorecard.calculateBonusScore(1)
            expect(bonusScore).toEqual(8)
        });
    })
});
