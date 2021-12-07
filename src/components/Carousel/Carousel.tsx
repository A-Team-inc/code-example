import React, { useState } from 'react';
import { Container } from '../Container/Container';
import { Button } from '../Button/Button';
import { Image } from '../Image/Image';
import { resolveLink, LinkInterface } from 'utils/linkResolver';
import { stripCompressionParams } from 'utils/stripCompression';

import s from './Carousel.scss';


export interface CarouselSlice {
  primary: {
    header: string;
  };
  fields: CarouselCard[];
}

interface CarouselCard {
  link_text: string;
  card_title: string;
  card_link: LinkInterface;
  background_image: {
    url: string;
  };
  card_description: string;
}

export const Carousel = ({ slice }: { slice: CarouselSlice }) => {
  const [active, setActive] = useState(0);
  const isActive = (idx: number) => active === idx;
  const {
    primary: { header },
    fields,
  } = slice;
  const currentCard = fields[active];
  return (
    <div className={s.Background}>
      <div className={s.Carousel__Intro}>
        <Container>
          <h1 className={s.Carousel__Intro__text}>{header}</h1>
        </Container>
      </div>
      <div className={s.Carousel}>
        {fields.map((card, idx: number) => (
          <Image
            className={s(s.Carousel__Image, { active: isActive(idx), inactive: !isActive(idx) })}
            key={idx}
            src={stripCompressionParams(card.background_image.url)}
          />
        ))}
        <div className={s.Carousel__Panel}>
          <Container relative={true}>
            <div className={s.Carousel__Card}>
              {fields.map((card, idx: number) => (
                <h3
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={s(s.Carousel__Panel__Items, { active: isActive(idx) })}
                >
                  {card.card_title}
                </h3>
              ))}
              <div className={s.Carousel__Card__Footer}>
                <h2 className={s.Carousel__Card__Footer__Text}>{currentCard.card_description}</h2>
                {currentCard.card_link && (
                  <Button withArrow href={resolveLink(currentCard.card_link)}>
                    {currentCard.link_text}
                  </Button>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
