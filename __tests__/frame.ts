import {Frame} from "../src/frame"
import {scoreRangeError} from "../src/errors";

describe(`Frame`, () => {
    let frame: Frame;
    let ss: number = 100;
    beforeEach(() => {
        frame = new Frame();
    })

    describe(`getRolls()`, () => {
        let i = 10;
        it(`ss${ss}.T${i}: has 2 rolls`,  () => {
            expect(frame.getRolls()).toEqual([0, 0]);
        });
    })

    ss += 100
    describe(`setRolls()`, () => {
        let i = 10;

        it(`ss${ss}.T${i}: throws an error when one score is out of bounds`,  () => {
            const params = [
                { rolls: [-1, 9] },
                { rolls: [9, -1] },
                { rolls: [11, -1] },
                { rolls: [-1, 11] }
            ]
            
            params.forEach((param) => {
                expect(() => {
                    frame.setRolls(param.rolls);
                }).toThrow(scoreRangeError)    
            })
        });
    })

    ss += 100
    describe(`isStrike()`, () => {
        let i = 10;
        it(`ss${ss}.T${i}: not a strike`,  () => {
            const params = [
                {
                    rolls: [9, 0],
                    expected: false
                },
                {
                    rolls: [10],
                    expected: true
                }
            ]

            params.forEach((param) => {
                frame.setRolls(param.rolls);
                expect(frame.isStrike()).toEqual(param.expected);
            })
        });
    })

    ss += 100
    describe(`isSpare()`, () => {
        let i = 10
        it(`ss${ss}.T${i}: not a spare`,  () => {
            const params = [
                {
                    rolls: [5, 9],
                    expected: false
                },
                {
                    rolls: [5, 5],
                    expected: true
                },
                {
                    rolls: [10],
                    expected: false
                },
                {
                    rolls: [1, 9, 10],
                    expected: true
                }
            ]
            params.forEach((param) => {
                frame.setRolls(param.rolls)
                expect(frame.isSpare()).toEqual(param.expected)
            })
        });
    })
});
