import React from 'react';
import Typography from '@material-ui/core/Typography';

type ScaleableTextProps = {
  minSize: number,

  expectedLength: number,

  maxSize: number,

  /**
   * Typography variant
   * @see https://material-ui.com/api/typography/
   */
  variant: 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
    | 'srOnly'
    | 'inherit',
  
  children: React.ReactNode,
}

export function ScaleableText(props: ScaleableTextProps) {
  return (
    <Typography>

    </Typography>
  )
}