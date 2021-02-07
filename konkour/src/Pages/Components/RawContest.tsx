import React from 'react';

type RawContestProps = {
  /**
   * The origin platform of the contest
   */
  sourcePlatform: "twitter" | "facebook" | "other",

  /**
   * Contest link source
   */
  link: string,

  /**
   * Author of the contes (OP)
   */
  author: string,

  /**
   * Date where the source contest was posted
   */
  originalDate: Date,

  /**
   * Date where the contest was harvested
   */
  harvestDate: Date,
}

export default function RawContest(props: RawContestProps) {
  return (
    <div>
      Un concours yaah
    </div>
  )
}