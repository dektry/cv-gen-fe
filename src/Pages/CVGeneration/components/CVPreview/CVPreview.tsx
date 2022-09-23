import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

import { useStyles } from './styles';

const mockTemplate = `<link
        href="http://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
        type="text/css"
/>
<style>
    .container {
        font-family: Roboto;
        font-size: 12px;
        width: 595px;
        height: 842px;
        display: flex;
        background: white;
        padding: 24px;
        box-sizing: border-box;
    }
    .first-column {
        width: 144px;
        padding-right: 16px;
    }
    .second-column {
        width: 418px;
    }
    .avatar {
        width: 137px;
        height: 137px;
        border-radius: 8px;
    }
    .about {
        height: 72px;
        margin-top: 32px;
    }
    .language {
        height: 128px;
        margin-top: 40px;
    }
    .name-block {
        height: 91px;
        margin-top: 46px;
        padding-right: 20px;
    }
    .name {
        font-size: 40px;
        font-weight: 500;
        margin: 0;
        margin-bottom: 10px;
    }
    .position-level-exp {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid #000;
    }
    .position-level-exp p {
        margin: 0;
        margin-top: 10px;
        line-height: 24px;
    }
    .description {
        height: 72px;
        margin: 0;
        margin-top: 32px;
    }
    .soft-skills {
        height: 177px;
        margin-top: 40px;
    }

    .soft-skills-list-el {
        display: inline-block;
        border: 1px solid #000;
        border-radius: 100px;
        margin: 0 12px 12px 0;
        padding: 3px 10px;
    }
    .prof-skills {
        height: fit-content;
    }
    .prof-skills-list {
        column-count: 2;
        gap: 40px;
        height: 250px;
        width: 394px;
    }
    .prof-skills-el {
        width: 177px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #000;
        margin-bottom: 12px;
    }
    .prof-skills-el p {
        line-height: 18px;
        margin: 0;
    }
    .title {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 12px;
    }
    .sub-title {
        font-size: 16px;
        font-weight: 700;
        margin: 0;
        margin-bottom: 8px;
    }
    .upper-case {
        text-transform: uppercase;
    }
    .bold {
        font-weight: 900;
        font-size: 13px;
    }
    .logo {
        position: absolute;
        top: 24px;
        right: 24px;
        width: 72px;
    }
</style>
<div class="container">
    <div class="first-column">
        <img
                class="avatar"
                src="https://dektry.peopleforce.io/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeVlLRkE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--f887ee19a13d152019b524527be1c5f6cfd55015/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9MWm05eWJXRjBTU0lKYW5CbFp3WTZCa1ZVT2d0eVpYTnBlbVZKSWcweU1EQjRNakF3WGdZN0JsUTZER2R5WVhacGRIbEpJZ3RqWlc1MFpYSUdPd1pVT2dsamNtOXdTU0lRTWpBd2VESXdNQ3N3S3pBR093WlUiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--dbe4983339f5bdf6e0f1560fb5e924eb0ffbbf5f/oie_9iqrw9SXBZgo.jpeg"
                alt="avatar"
        />
        <p class="about title">About</p>
        <div class="language">
            <p class="title">Language</p>
            <div class="upper-case">English - B2</div>
        </div>
        <p class="title">Education</p>
        <div class="upper-case">
            <p>
                Belarusian National Technical University/Civil Engineering/2010-2015
            </p>
        </div>
    </div>
    <div class="second-column">
        <div class="name-block">
            <p class="name">Denis Homich</p>
            <div class="position-level-exp">
                <p>Fullstack developer</p>
                <p>&#8226;</p>
                <p>middle+</p>
                <p>&#8226;</p>
                <p>10 years experience</p>
            </div>
        </div>
        <p class="description">
            It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of using
            Lorem Ipsum is that it has a more-or-less normal distribution of letters,
            as opposed to using 'Content here, content here',
        </p>
        <div class="soft-skills">
            <p class="title">Soft skills</p>
            <div>
                <p class="soft-skills-list-el">Confidence</p>
                <p class="soft-skills-list-el">Ability to influence</p>
                <p class="soft-skills-list-el">Resilience</p>
            </div>
        </div>
        <div class="prof-skills">
            <p class="title">Professional skills</p>
            <div>
                <p class="sub-title">Programming</p>
                <div class="prof-skills-list">
                    <div class="prof-skills-el">
                        <p>JavaScript</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>React</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>Angular</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>JavaScript</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>React</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>Angular</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>JavaScript</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>React</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>Angular</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>JavaScript</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>React</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>JavaScript</p>
                        <p class="bold">Expert</p>
                    </div>
                    <div class="prof-skills-el">
                        <p>React</p>
                        <p class="bold">Expert</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <svg
            class="logo"
            viewBox="0 0 476 216"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
    >
        <path
                d="M321.509 215.843C381.212 215.843 429.612 167.524 429.612 107.921C429.612 48.318 381.212 0 321.509 0C261.805 0 213.406 48.318 213.406 107.921C213.406 167.524 261.805 215.843 321.509 215.843Z"
                fill="url(#paint0_linear_32_12336)"
        />
        <path
                d="M16.1368 64.1556H1.0603V82.8993H7.46781H15.8777C39.4348 82.8993 47.609 92.9881 47.609 108.227C47.609 125.043 38.5395 135.884 15.8777 135.884H7.46781H1.0603V154.627H14.2051C52.2731 154.627 68.3154 134.073 68.3154 108.227C68.3154 84.5688 54.9823 64.1556 16.1368 64.1556Z"
                fill="black"
        />
        <path
                d="M82.8036 64.1556H152.061V82.8993H102.874V99.714H148.834V117.799H102.874V135.884H153.239V154.627H82.8036V64.1556Z"
                fill="black"
        />
        <path
                d="M172.369 64.1556H192.439V99.432L227.257 64.1556H253.405L214.065 104.23L256.02 154.651H229.612L198.917 117.681L192.439 124.266V154.651H172.369V64.1556Z"
                fill="black"
        />
        <path
                d="M310.388 64.1556H261.319V82.8993H290.318V154.627H310.388V64.1556Z"
                fill="white"
        />
        <path
                d="M361.532 120.127C372.415 115.87 379.27 105.264 379.27 93.6232C379.27 78.619 371.497 64.1556 342.639 64.1556H326.055V82.8993H342.239C355.054 82.8993 358.422 87.1557 358.422 93.6232C358.422 100.867 352.863 105.006 343.016 105.006H326.055V123.749H340.425L362.568 154.651H386.761L361.532 120.127Z"
                fill="white"
        />
        <path
                d="M438.939 122.197V154.651H418.868V122.197L382.497 64.1556H406.453L429.234 100.349L452.531 64.1556H475.713L438.939 122.197Z"
                fill="black"
        />
        <defs>
            <linearGradient
                    id="paint0_linear_32_12336"
                    x1="245.067"
                    y1="184.226"
                    x2="397.685"
                    y2="31.3513"
                    gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#F6856C" />
                <stop offset="1" stop-color="#B727D9" />
            </linearGradient>
        </defs>
    </svg>
</div>`;

interface ICVPreviewProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export const CVPreview = React.memo((props: ICVPreviewProps) => {
  const { isModalOpen, handleOk, handleCancel } = props;

  const classes = useStyles();

  const [cvCanvasDimensions, setCvCanvasDimensions] = useState({ width: 0, height: 0 });
  const [template, setTemplate] = useState<string>('');

  useEffect(() => {
    const height = window.innerHeight - 270;
    const width = height / 1.414;
    setCvCanvasDimensions({ width, height });

    setTemplate(mockTemplate);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const cvCanvas = document.getElementById('cv-canvas');

      if (cvCanvas) {
        const scale = cvCanvasDimensions.width / 595;
        const newEl = document.createElement('div');
        newEl.innerHTML = template;
        newEl.style.scale = `${scale} ${scale}`;

        cvCanvas.appendChild(newEl);
      }
    }
    return () => {
      const el = document.getElementById('cv-canvas');
      if (el) {
        el.innerHTML = '';
      }
    };
  }, [template, isModalOpen]);

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="CLOSE"
      okText="DOWNLOAD"
      width="50vw"
      style={{ top: '50px' }}
    >
      <div className={classes.container}>
        <h1>CV Preview</h1>
        <div
          id="cv-canvas"
          style={{ width: cvCanvasDimensions.width + 'px', height: cvCanvasDimensions.height + 'px' }}
          className={classes.cvBox}
        ></div>
      </div>
    </Modal>
  );
});
