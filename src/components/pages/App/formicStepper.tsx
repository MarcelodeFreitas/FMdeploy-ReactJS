import { Children, useState, ReactElement } from 'react'
import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core'

export interface FormikStepProps
    extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    label: string
}

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>
}

export default function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
    const childrenArray = Children.toArray(children) as ReactElement<FormikStepProps>[]
    const [step, setStep] = useState(0)
    const currentChild = childrenArray[step]
    const [completed, setCompleted] = useState(false)

    function isLastStep() {
        return step === childrenArray.length - 1
    }

    return <Formik {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helpers) => {
            //calling parent if we are on the last child 
            if (isLastStep()) {
                await props.onSubmit(values, helpers)
                setCompleted(true)
            } else {
                //next step
                setStep(s => s + 1)
            }
        }}>
        {({ isSubmitting }) => (
            <Form autoComplete="off">
                <Stepper alternativeLabel activeStep={step}>
                    {childrenArray.map((child, index) => (
                        <Step key={child.props.label} completed={step > index || completed}>
                            <StepLabel>{child.props.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {currentChild}

                <Grid container spacing={2}>
                    {step > 0 ? (
                        <Grid item>
                            <Button
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                onClick={() => setStep((s) => s - 1)}
                            >
                                Back
                            </Button>
                        </Grid>
                    ) : null}
                    <Grid item>
                        <Button
                            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                            disabled={isSubmitting}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
                        </Button>
                    </Grid>
                </Grid>

            </Form>
        )}
    </Formik>
}