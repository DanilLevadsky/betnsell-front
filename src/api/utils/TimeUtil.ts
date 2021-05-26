import {TimeLeft} from '../model/time/TimeLeft';

const TimeUtil = {

  dateIsInFuture(date: string): boolean {
    return new Date(date) >= new Date();
  },

  timeUntilDate(date: string): TimeLeft {
    const msDifference: number = Math.abs(new Date(date).getTime() - new Date().getTime());
    const days = Math.floor(msDifference / (1000 * 3600 * 24));
    const hours = Math.floor((msDifference / (1000 * 3600)) % 24);
    const minutes = Math.floor((msDifference / (1000 * 60)) % (60));
    const seconds = Math.floor((msDifference / 1000) % (60));
    return  new TimeLeft(days, hours, minutes, seconds);
  }
};

export default TimeUtil;
