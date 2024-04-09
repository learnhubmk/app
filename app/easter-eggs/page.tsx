import Image from 'next/image';
import React from 'react';
import Logo3D from '../../components/module-components/logo3D/Logo3D';

const EasterEggs = () => {
  const width = 100;
  const height = 100;
  return (
    <>
      <>
        Animated SVGs <br />
        <Image
          src="/logo/logoAnimated.svg"
          alt="LearnHub Logo Animated"
          width={width * 5}
          height={height}
        />
        <Image
          src="/logo/logomarkAnimated.svg"
          alt="LearnHub Logomark Animated"
          width={width}
          height={height}
        />
        <Image
          src="/logo/logomarkAnimatedReader.svg"
          alt="LearnHub Logo - Eye of Sauron"
          width={width}
          height={height}
        />
      </>
      <>
        <br />
        Three.js Asset Loading
        <Logo3D />
      </>
    </>
  );
};

export default EasterEggs;
