import { Meta, Story } from "@storybook/react/types-6-0";
import { BannerBtn, BannerBtnProps } from "./BannerBtn";

const path =
  "data:image/jpeg;base64,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";

export default {
  title: "atom/banner-btn",
  component: BannerBtn,
} as Meta;

const Template: Story<BannerBtnProps> = (args) => {
  return <BannerBtn {...args} />;
};

export const Banner = Template.bind({});
Banner.args = {
  title: "사이드 프로젝트 찾기",
  desc: "나에게 잘 맞는 사이드 프로젝트 탐색하기",
  src: path,
} as BannerBtnProps;
