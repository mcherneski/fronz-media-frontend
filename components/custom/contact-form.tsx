import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Textarea } from '../ui/textarea'
import { sendEmail } from '@/lib/send-email'

interface ContactFormProps {
    closeForm: () => void
}

const schema = z.object({
    name: z.string().min(1,{
        message: 'Name is required!'
    }),
    email: z.string().email(),
    message: z.string().max(500, {
        message: 'Message must be less than 500 characters!'
    })
})

export function ContactForm({ closeForm }: ContactFormProps) {

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues:{
            name: '',
            email: '',
            message: ''
        }
    })

    function onSubmit(values: z.infer<typeof schema>) {
        console.log('Email values: ', values)
        sendEmail(values)
        closeForm
    }

    return (
        <Card className='fixed w-1/3 h-3/5 m-auto inset-0 z-50 text-fronzGold border-fronzBlue' style={{backgroundColor: '#151414'}}>
            <CardHeader className='relative'>
                <CardTitle>Let's Connect!</CardTitle>
                <CardDescription>Fill out the form below to get in touch with us.</CardDescription>
                <Button variant='default' className='absolute top-0 right-0 m-4 bg-fronzPink text-fronzGray' onClick={closeForm}>X</Button>
            </CardHeader>
            <CardContent className='m-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email Address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='message'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea className='resize-none' placeholder="Message (500 characters or less)" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Optional
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)} className='bg-fronzGold text-fronzGray'>Submit</Button>
            </CardFooter>
        </Card>
    )

}
