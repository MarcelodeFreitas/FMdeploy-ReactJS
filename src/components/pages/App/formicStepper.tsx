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

    function isPenultimate() {
        return step === childrenArray.length - 2
    }

    return <Formik {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helpers) => {
            //calling parent if we are on the penultimate child 
            if (isPenultimate()) {
                await props.onSubmit(values, helpers)
                setCompleted(true)
                setStep(s => s + 1)
            } else {
                /* console.log(props) */
                //next step
                setStep(s => s + 1)
            }
        }

        }>
        {({ isSubmitting, resetForm }) => (
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
                    {(step > 0 && step < 2) ? (
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
                    {step < 2 ? (
                    <Grid item>
                        <Button
                            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                            disabled={isSubmitting}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            {isSubmitting ? 'Submitting' : isPenultimate() ? 'Submit' : 'Next'}
                        </Button>
                    </Grid>
                    ) : null}
                    {isLastStep() ? (
                    <Grid item>
                        <Button
                            disabled={isSubmitting}
                            variant="contained"
                            color="primary"
                            type="reset"
                            onClick={() => {resetForm({}); setStep(0)}}
                        >
                            New Model
                        </Button>
                    </Grid>
                    ) : null}
                </Grid>

            </Form>
        )}
    </Formik>
}