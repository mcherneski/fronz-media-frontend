'use client'
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
import { Textarea } from '@/components/ui/textarea'
import { sendEmail } from '@/lib/send-email'
import { useToast } from '@/components/ui/use-toast'
import { ContactCard } from '@/components/custom/contact-card'

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

export function ContactForm({ closeForm }: { closeForm: () => void }) {
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
                title: 'Oh no!',
                description: 'There was an error sending your message.'
            })
            closeForm()
        }
    }

    const handleClose = () => {
        closeForm()
    }

    return (
        <ContactCard closeForm={handleClose}>
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
        </ContactCard>

    )

}
