import {IFrame} from "./frame";

export class Scorecard {
    private frames: IFrame[] = []

    addFrame = (frame) => {
        this.frames.push(frame)
    }

    getFrames = () => {
        return this.frames
    }
}