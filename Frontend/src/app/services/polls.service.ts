import { Injectable } from '@angular/core';
import { Poll } from '../Models/polls';

@Injectable({
  providedIn: 'root',
})
export class PollsService {
  private polls: Poll[] = [
    {
      ID: '1',
      title: 'Occupy MOH',
      options: [
        { name: 'yes', votes: 0 },
        { name: 'no', votes: 0 },
      ],
      voters: [],
    },
    {
      ID: '2',
      title: 'Ruto Must GO',
      options: [
        { name: 'yes', votes: 0 },
        { name: 'no', votes: 0 },
      ],
      voters: [],
    },
    {
      ID: '3',
      title: 'Anguka nayo',
      options: [
        { name: 'yes', votes: 0 },
        { name: 'no', votes: 0 },
      ],
      voters: [],
    },
  ];
  constructor() {}
  getPolls(): Poll[] {
    return this.polls;
  }
  addPoll(newPoll: Poll) {
    this.polls.push(newPoll);
  }
  vote(pollTitle: string, optionName: string, userId:string): boolean {
    const poll = this.polls.find((p) => p.title === pollTitle);
    if (poll) {
      if(poll.voters.includes(userId)){
          throw new Error('User has already voted in this poll');
      }
      const option = poll.options.find((o) => o.name === optionName);
      if (option) {
        option.votes++;
        poll.voters.push(userId);
        return true
      }
    }
    return false
  }
  addOption(pollTitle: string, optionName: string) {
    const poll = this.polls.find((p) => p.title === pollTitle);
    if (poll) {
      poll.options.push({ name: optionName, votes: 0 });
    }
  }
  deletePoll(id: string) {
    const poll = this.polls.filter((x) => x.ID !== id);
    return poll;
  }
  calculateVotes(ID: string) {
    const poll = this.polls.find((p) => p.ID === ID);
    if (poll) {
      const totalVotes = poll.options.reduce(
        (curr, acc) => curr + acc.votes,
        0
      );
      poll.options.forEach((acc) => {
        acc.votes =
          totalVotes > 0 ? Math.round((acc.votes / totalVotes) * 100) : 0;
      });
    }
  }
}
