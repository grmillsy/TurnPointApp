import {useState, FormEvent} from "react";
import TextInput from "./TextInput.tsx";
import SelectInput from "./SelectInput.tsx";
import {ClientType} from "../utils/types.ts";
import {addClient} from "../utils/dataHelper.ts";
import FormSection from "./FormSection.tsx";
import Button from "./Button.tsx";

const OPTIONS = ['NIDS', 'HCP', 'CHSP', 'DVA', 'HACC']

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

const LoadingSpinner = <div>
    <svg aria-hidden="true"
         className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"/>
        <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"/>
    </svg>
</div>

export default ClientForm