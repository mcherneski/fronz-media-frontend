'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendEmail } from '@/lib/send-email'
import { useToast } from '@/components/ui/use-toast'

const schema = z.object({
    name: z.string().min(1, {
        message: 'Name is required.'
    }),
    email: z.string().email(),
    tgHandle: z.string().optional(),
    message: z.string().max(500, {
        message: 'Message must be less than 500 characters.'
    }),
    phoneNumber: z.string().optional()
})

interface ContactCardProps {
    closeForm: () => void
    children?: React.ReactNode
}

export function ContactCard({ closeForm, children }: ContactCardProps) {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            tgHandle: '',
            email: '',
            message: '',
            phoneNumber: ''
        }
    })

    async function onSubmit(values: z.infer<typeof schema>) {
        try {
            await sendEmail(values)
            toast({
                title: 'Message Sent',
                description: 'We will get back to you soon!'
            })
            closeForm()
        } catch (error) {
            toast({
                title: 'Sorry!',
                description: 'There was an error sending your message.'
            })
            closeForm()
        }
    }

    return (
        <div className='fixed w-screen h-screen top-0 left-0  flex flex-col items-center justify-center bg-fronz-gradient-center'> 
            <Card className='relative h-auto w-1/4 top-0 left-0 m-auto drop-shadow-glow min-w-[350px]'>
                <CardHeader>
                    <Button onClick={closeForm} className='absolute top-0 right-0 m-2'>x</Button>
                    <CardTitle>Contact Me</CardTitle>
                    <CardDescription>Send a message to get in touch.</CardDescription>
                </CardHeader>
                <CardContent>
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
                                name='tgHandle'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telegram Handle</FormLabel>
                                        <FormControl>
                                            <Input placeholder="@Username" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Optional
                                        </FormDescription>
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
                            <div style={{ display: 'none', visibility: 'hidden' }}>
                                <FormField
                                    control={form.control}
                                    name='phoneNumber'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>lolGotcha</FormLabel>
                                            <FormControl>
                                                <Input placeholder="@lolGotcha" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                        <Button type="submit" onClick={form.handleSubmit(onSubmit)} className='bg-fronzGold text-fronzGray'>Submit</Button>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}