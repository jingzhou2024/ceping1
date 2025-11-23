import { AssessmentTask, Question, TaskStatus, Report, ReportStatus } from "./types";

export const MOCK_USER = {
  id: 'user-123',
  phone: '18159048729',
  name: '测试员工',
  avatar: 'https://picsum.photos/200'
};

export const MOCK_TASKS: AssessmentTask[] = [
  {
    id: 'task-001',
    title: '2024年度领导力测评',
    description: '这是由测评主管创建的年度综合能力测评，用于评估员工的领导潜力和团队协作能力。',
    durationMinutes: 30,
    status: TaskStatus.PENDING,
    createdAt: '2024-05-15',
    questionCount: 12,
    tags: ['中优先级'],
    reportStatus: ReportStatus.NONE
  },
  {
    id: 'task-002',
    title: '职业性格倾向测试 (MBTI简版)',
    description: '了解您的职业性格倾向，帮助您更好地规划职业发展路径。',
    durationMinutes: 15,
    status: TaskStatus.IN_PROGRESS,
    createdAt: '2024-05-10',
    questionCount: 8,
    tags: ['高优先级'],
    reportStatus: ReportStatus.NONE
  },
  {
    id: 'task-003',
    title: '第一季度绩效自评',
    description: '请根据第一季度的工作表现完成自评。',
    durationMinutes: 45,
    status: TaskStatus.COMPLETED,
    createdAt: '2024-04-01',
    completedAt: '2024-04-05',
    questionCount: 20,
    tags: ['已归档'],
    reportStatus: ReportStatus.READY
  }
];

export const MOCK_QUESTIONS: Question[] = [
  { id: 'q1', text: '我是一个健谈的人', type: 'LIKERT' },
  { id: 'q2', text: '我善于通过各种方式向对方的决策施加影响', type: 'LIKERT' },
  { id: 'q3', text: '我喜欢按部就班地工作，不喜欢突发状况', type: 'LIKERT' },
  { id: 'q4', text: '在团队中，我倾向于倾听多于表达', type: 'LIKERT' },
  { id: 'q5', text: '面对压力时，我能保持冷静', type: 'LIKERT' },
  { id: 'q6', text: '我乐于帮助同事解决工作中的难题', type: 'LIKERT' },
  { id: 'q7', text: '我经常思考未来的职业规划', type: 'LIKERT' },
  { id: 'q8', text: '我更喜欢独立工作而不是团队协作', type: 'LIKERT' },
];

export const LIKERT_OPTIONS = [
  { value: 1, label: '完全不符合' },
  { value: 2, label: '不太符合' },
  { value: 3, label: '有点不符合' },
  { value: 4, label: '有点符合' },
  { value: 5, label: '比较符合' },
  { value: 6, label: '完全符合' },
];

export const MOCK_REPORTS: Report[] = [
  {
    id: 'rpt-001',
    taskId: 'task-003',
    taskTitle: '第一季度绩效自评',
    generatedAt: '2024-04-05 14:30',
    fileSize: '2.4 MB',
    downloadUrl: '#'
  }
];