import { Entity } from ".";

export type TestResult = Entity<{
  userPid: string;
  testName: string;
  size: number;
}>
