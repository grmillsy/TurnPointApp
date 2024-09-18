import {useState, FormEvent} from "react";
import TextInput from "./TextInput.tsx";
import SelectInput from "./SelectInput.tsx";
import {ClientType} from "../utils/types.ts";
import {addClient} from "../utils/dataHelper.ts";
import {LoadingSpinner} from "../utils/icons.tsx";

import FormSection from "./FormSection.tsx";
import Button from "./Button.tsx";

const OPTIONS = ['NDIS', 'HCP', 'CHSP', 'DVA', 'HACC']

const ClientForm = () => {
    const [step, setStep] = useState<number>(1)
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState<ClientType>({
        name: '',
        dateOfBirth: '',
        mainLanguage: '',
        secondaryLanguage: '',
        fundingSource: '',
    })

    const handleChange = (data: { name: string; value: string; }) => {

        const { name, value } = data;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addClient(formData);
            setSuccessMessage('Client added successfully! Please refresh table to see changes');
            setStep(1);
            setFormData({
                name: '',
                dateOfBirth: '',
                mainLanguage: '',
                secondaryLanguage: '',
                fundingSource: '',
            });
        } catch (error) {
            console.error('Error adding client:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const _handleNext = () => {
        setSuccessMessage(null)
        setStep(step + 1)
    }
    const _handlePrev = () => {
        setStep(step - 1)
    }

    return (
        <div>
            <form className="my-6 w-full m-auto max-w-lg p-6 border border-solid border-slate-300 rounded-3xl" onSubmit={onSubmit}>
                {successMessage && (
                    <div className="mb-4 text-green-600 font-bold" role="status">
                        {successMessage}
                    </div>
                )}
                {step === 1 && (
                    <>
                        <FormSection title='Hello,'
                                     description='To add a client please add their name and date of birth'>
                           <>
                                <TextInput title='Full Name*' id='name'
                                       onChange={handleChange}
                                       placeholder='Mr Squigles'/>
                                <TextInput title="Date Of Birth*" id="dateOfBirth"
                                       onChange={handleChange}
                                       placeholder="01/01/1983"/>
                               </>
                        </FormSection>
                        <div className='w-full flex justify-end'>
                            <Button onClick={_handleNext} disabled={formData.name.length === 0 || formData.dateOfBirth.length === 0}> Next </Button>
                        </div>
                    </>
                )
                }
                {step === 2 && (
                    <>
                        <FormSection title='Great!'
                                     description='Next please add their main and secondary languages'>
                            <>
                                <TextInput title="Primary Language*" id="mainLanguage"
                                           onChange={handleChange}
                                           placeholder="Australian"/>
                                <TextInput title="Secondary Language" id="secondaryLanguage"
                                           onChange={handleChange}
                                           placeholder="Javascript"/>
                            </>
                        </FormSection>
                        <div className='w-full flex justify-between'>
                            <Button onClick={_handlePrev} > Previous </Button>
                            <Button onClick={_handleNext} disabled={formData.mainLanguage.length === 0}> Next </Button>
                        </div>
                    </>

                )}
                {step === 3 && (
                    <>
                        <FormSection title='Lastly,'
                                     description='Please select a funding option from the dropdown'>
                                    <SelectInput title="Funding Source*" id="fundingSource" onChange={handleChange}
                                                 options={OPTIONS}/>
                        </FormSection>
                        <div className='w-full flex justify-between'>
                            <Button onClick={_handlePrev} > Previous </Button>
                            <Button type="submit" disabled={formData.fundingSource.length === 0}>  {isLoading ? LoadingSpinner : 'Submit'} </Button>
                        </div>
                    </>

                )}
            </form>
        </div>
    )
}



export default ClientForm