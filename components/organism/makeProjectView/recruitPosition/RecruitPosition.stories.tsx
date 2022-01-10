import { Meta, Story } from "@storybook/react/types-6-0";
import { RecruitPosition, RecruitPositionProps } from "./RecruitPosition";

export default {
  title: "organism/makeProjectView/recruitPosition",
  component: RecruitPosition,
} as Meta;

const Template: Story<RecruitPositionProps> = (args) => {
  return <RecruitPosition {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  position: [
    {
      id: 1,
      name: "기획자",
      positionNum: [
        {
          id: 11,
          name: 0,
        },
        {
          id: 12,
          name: 1,
        },
        {
          id: 13,
          name: 2,
        },
        {
          id: 14,
          name: 3,
        },
      ],
    },
    {
      id: 2,
      name: "디자이너",
      positionNum: [
        {
          id: 21,
          name: 0,
        },
        {
          id: 22,
          name: 1,
        },
        {
          id: 23,
          name: 2,
        },
        {
          id: 24,
          name: 3,
        },
      ],
    },
    {
      id: 3,
      name: "개발자",
      positionNum: [
        {
          id: 31,
          name: 0,
        },
        {
          id: 32,
          name: 1,
        },
        {
          id: 33,
          name: 2,
        },
        {
          id: 34,
          name: 3,
        },
      ],
    },
  ],
} as RecruitPositionProps;
