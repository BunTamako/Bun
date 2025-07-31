// 成人依恋量表（ECR）题目数据
export interface Question {
  id: number;
  text: string;
  isReverseScored: boolean;
}

export const questions: Question[] = [
  { id: 1, text: "我发现与人亲近比较容易", isReverseScored: false },
  { id: 2, text: "我发现要我去依赖别人很困难", isReverseScored: false },
  { id: 3, text: "我时常担心情侣并不真心爱我", isReverseScored: true },
  { id: 4, text: "我发现别人并不愿意像我希望的那样亲近我", isReverseScored: false },
  { id: 5, text: "当别人希望与我非常亲近时，我会觉得不舒服", isReverseScored: false },
  { id: 6, text: "我担心自己太依赖别人", isReverseScored: false },
  { id: 7, text: "如果别人不能像我希望的那样在我身边时，我会感到心烦", isReverseScored: false },
  { id: 8, text: "当别人希望与我非常亲近时，我会感到紧张", isReverseScored: false },
  { id: 9, text: "我有点担心会失去别人", isReverseScored: false },
  { id: 10, text: "当别人对我表达很亲密时，我会觉得不自在", isReverseScored: false },
  { id: 11, text: "我时常担心别人不愿意和我在一起", isReverseScored: false },
  { id: 12, text: "当别人希望与我非常亲近时，我会觉得不舒服", isReverseScored: false },
  { id: 13, text: "我时常担心别人并不像我重视他那样重视我", isReverseScored: false },
  { id: 14, text: "当别人希望与我非常亲近时，我会感到紧张", isReverseScored: false },
  { id: 15, text: "我很难完全信赖别人", isReverseScored: true },
  { id: 16, text: "我发现别人不愿意像我希望的那样亲近我", isReverseScored: false },
  { id: 17, text: "我时常担心别人并不真心爱我", isReverseScored: false },
  { id: 18, text: "当别人希望与我非常亲近时，我会觉得不自在", isReverseScored: false },
  { id: 19, text: "我发现自己很难完全依赖别人", isReverseScored: true },
  { id: 20, text: "我担心自己需要别人时他们却不在我身边", isReverseScored: false },
  { id: 21, text: "我发现别人并不愿意像我希望的那样亲近我", isReverseScored: false },
  { id: 22, text: "我很难让别人依赖我", isReverseScored: true },
  { id: 23, text: "当别人对我表达很亲密时，我会觉得紧张", isReverseScored: false },
  { id: 24, text: "我担心别人不会一直关心我", isReverseScored: false },
  { id: 25, text: "我发现自己很难完全信任别人", isReverseScored: true },
  { id: 26, text: "我担心自己会被抛弃", isReverseScored: false },
  { id: 27, text: "我发现我很难让人依靠", isReverseScored: true },
  { id: 28, text: "当别人希望与我非常亲近时，我会感到紧张", isReverseScored: false },
  { id: 29, text: "我担心自己不够好", isReverseScored: true },
  { id: 30, text: "我担心别人不会接受我", isReverseScored: false },
  { id: 31, text: "我担心别人会抛弃我", isReverseScored: true },
  { id: 32, text: "当别人希望与我非常亲近时，我会觉得不舒服", isReverseScored: false },
  { id: 33, text: "我担心别人不会喜欢真实的我", isReverseScored: true },
  { id: 34, text: "当别人希望与我非常亲近时，我会觉得紧张", isReverseScored: false },
  { id: 35, text: "我很难让别人了解我", isReverseScored: true },
  { id: 36, text: "当我与人亲近时，会担心自己受到伤害", isReverseScored: false },
];

// 结果分析文本
export const resultAnalysis = {
  secure: {
    title: "安全型依恋",
    description: "安全型依恋的人通常感到与伴侣的亲密关系很舒适，既不会过度依赖，也不会担心被抛弃。他们能够信任伴侣，也能够让伴侣依赖自己。在亲密关系中表现出自信和放松，能够有效的沟通自己的需求和感受。",
    imagePrompt: "Illustration of secure attachment style in relationships, showing two people in a healthy, balanced relationship with open body language and warm expressions, modern clean style, soft colors"
  },
  fearful: {
    title: "恐惧型依恋",
    description: "恐惧型依恋的人通常既害怕亲密关系，又担心被抛弃。他们渴望亲密但又害怕受到伤害，常常在关系中感到矛盾和不安。这种类型的人可能因为害怕拒绝而避免亲密关系，或者在关系中表现出防御性行为。",
    imagePrompt: "Illustration of fearful attachment style in relationships, showing a person with conflicting emotions about connection, modern clean style, soft colors"
  },
  preoccupied: {
    title: "专注型依恋",
    description: "专注型依恋的人通常非常渴望亲密关系，常常担心伴侣不够爱自己或可能离开自己。他们可能会过度依赖伴侣，对关系中的小波动过度敏感。这种类型的人通常需要大量的情感确认，并可能在关系中表现出较强的占有欲。",
    imagePrompt: "Illustration of preoccupied attachment style in relationships, showing a person seeking emotional connection and reassurance, modern clean style, soft colors"
  },
  dismissing: {
    title: "冷漠型依恋",
    description: "冷漠型依恋的人通常对亲密关系不太感兴趣，倾向于保持情感距离。他们强调独立和自给自足，可能会否认需要亲密关系。这种类型的人可能在关系中显得冷漠或疏离，难以表达情感或接受伴侣的情感表达。",
    imagePrompt: "Illustration of dismissing attachment style in relationships, showing a person maintaining emotional distance, modern clean style, soft colors"
  }
};
