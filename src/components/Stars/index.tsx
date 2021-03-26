import React from "react"

import styled, { keyframes } from "styled-components"

const shooting = keyframes`
  0% {
    transform: translateX(0) rotate(45deg);
  }
  100% {
    transform: translate(
      ${typeof window !== `undefined` ? window.screen.width * 2 : 0}px,
      ${typeof window !== `undefined` ? window.screen.width * 2 : 0}px
    );
  }
`

const tail = keyframes`
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
`
const shining = keyframes`
  0% {
    width: 0;
  }
  50% {
    width: 20px;
  }
  100% {
    width: 0;
  }
`

const StarStyle = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  height: 2px;
  background-image: linear-gradient(-45deg, #d6d6d6, rgba(0, 0, 255, 0));
  filter: drop-shadow(0 0 8px #d6d6d6);
  animation: ${tail} ${props => props.duration * 2}ms ${props => props.delay}ms
      ease-in-out infinite,
    ${shooting} ${props => props.duration * 2}ms ${props => props.delay}ms
      ease-in-out infinite;

  // &:before,
  // &:after {
  //   position: absolute;
  //   content: "";
  //   top: calc(50% - 1px);
  //   right: 0;
  //   height: 2px;
  //   border-radius: 100%;
  //   background-image: linear-gradient(
  //     -45deg,
  //     rgba(0, 0, 255, 0),
  //     #d6d6d6,
  //     rgba(0, 0, 255, 0)
  //   );
  //   transform: translateX(50%) rotateZ(45deg);
  //   animation: ${shining} ${props => props.duration}ms ${props =>
    props.delay}ms
  //     ease-in-out infinite;
  // }

  // &:after {
  //   transform: translateX(50%) rotateZ(-45deg);
  // }
`

const Stars = () => {
  const NB_STARS = 25
  const stars = Array.from({ length: NB_STARS })

  const DURATION = 5000

  return (
    <div
      id="root"
      className="absolute overflow-hidden h-full w-full bg-gray-800 -z-1"
    >
      {stars.length > 0 &&
        stars.map((star, index) => (
          <>
            <StarStyle
              key={index}
              x={
                Math.random() *
                (typeof window !== `undefined` ? window.screen.width : 0)
              }
              y={
                (Math.random() *
                  (typeof window !== `undefined` ? window.screen.height : 0)) /
                2
              }
              duration={DURATION}
              delay={(DURATION / NB_STARS) * 4 * index}
            />
          </>
        ))}
    </div>
  )
}

export default Stars
