import React from 'react';

import styled from '@emotion/styled';

import { borderRadius, colors, fontWeights } from '../../designSystem';

import { LinkField } from '../../commons/Fields';
import { LinkURL, SocialMediaButtons } from '../../commons/Share';

import ApartmentDetail from './ApartmentDetail';
import Estimation from './Estimation';

const Guest = styled.article({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  '& p': {
    fontWeight: fontWeights.bold,
    marginBottom: '3rem',
  },
});

const WarningWrapper = styled.article({
  display: 'flex',
  minHeight: '80vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  '& img': {
    borderRadius: borderRadius.box,
  },

  '& span': {
    display: 'block',
    margin: '0 auto',
    padding: '3rem 0',

    color: colors.red,
    fontSize: '1.3rem',
    fontWeight: fontWeights.bold,
    letterSpacing: '.2rem',
  },

  '& button': {
    backgroundColor: colors.red,

    color: colors.white,
  },
});

const Section = styled.section({
  '& button': {
    marginBottom: '1rem',
    textAlign: 'center',

    color: colors.themeColor,
    fontSize: '.75rem',

    border: `1px solid ${colors.themeColor}`,
    backgroundColor: colors.white,

    '&:hover': {
      color: colors.white,
      backgroundColor: colors.themeColor,
    },
  },

  '& article': {
    marginBottom: '1rem',
  },
});

const Back = styled.div({
  position: 'absolute',
  top: '0',
  right: '1.5rem',

  fontSize: '.69rem',
});

const EstimationWrapper = styled.article({
  position: 'relative',

  '& button': {
    position: 'absolute',
    top: '0',
    right: '0',
  },
});

const Heading = styled.h2({
  marginBottom: '1rem',
  padding: '.25rem 0',

  color: colors.themeColor,
  fontSize: '1.22rem',
  fontWeight: fontWeights.bold,
});

const ShareWrapper = styled.article({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& h3': {
    width: '100%',
    padding: '.25rem 0',
    textAlign: 'center',
    borderBottom: `1px solid ${colors.themeBorder}`,

    color: colors.themeColor,
    fontWeight: fontWeights.bold,
  },
});

const ShareTargets = styled.div({
  width: '50%',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'start',
  marginTop: '1rem',
});

export default function Result({
  profile,
  apartment,
  isPyeong,
  estimation,
  onClick,
}) {
  if (profile.isNew) {
    return (
      <Guest>
        <p>
          제테크 정보가 아직 없어요!
        </p>
        <LinkField
          url="/profile/new"
          title="확인 하러가기"
          onClick={onClick}
        />
      </Guest>
    );
  }

  if (profile.currentBalance >= apartment.price) {
    return (
      <WarningWrapper>
        <img
          src="https://user-images.githubusercontent.com/77006427/116652368-01909680-a9c0-11eb-94e5-4d094dd21745.png"
          alt="dont-lie"
        />
        <span>😡 거짓말 하지마세욧! 😡</span>

        <LinkField
          url="/profile/new"
          title="수정 하러가기"
          onClick={() => onClick({ url: '/profile/new' })}
        />
      </WarningWrapper>
    );
  }

  return (
    <Section>
      <Back>
        <LinkField
          url="/apartments"
          title="뒤로가기"
          onClick={() => onClick({ url: '/apartments/riverside' })}
        />
      </Back>

      <>
        {apartment && (
          <ApartmentDetail
            apartment={apartment}
            isPyeong={isPyeong}
          />
        )}
      </>

      <EstimationWrapper>
        <Heading>
          구매까지...
        </Heading>

        <LinkField
          url="/profile/new"
          title="저축 수정 하러가기"
          onClick={onClick}
        />

        {estimation && (
          <Estimation
            profile={profile}
            apartment={apartment}
            estimation={estimation}
          />
        )}
      </EstimationWrapper>

      <ShareWrapper>
        <h3>공유 하기</h3>
        <ShareTargets>
          <LinkURL />
          <SocialMediaButtons />
        </ShareTargets>
      </ShareWrapper>
    </Section>
  );
}
