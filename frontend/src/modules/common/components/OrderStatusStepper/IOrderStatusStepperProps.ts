type Step = {
    status: string;
    date: string;
    icon: () => JSX.Element;
};

export interface IOrderStatusStepperProps {
    activeStep: number;
    steps: Step[];
}
