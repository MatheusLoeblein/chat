import { useMutation } from "@tanstack/react-query"
import { api } from '@/services/api/axios'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function useSignUp(){
    
    const router = useRouter()

    const { data, isSuccess, mutate, error } = useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/signup', data)

            return response.data
        },

        onSuccess:() => {
            toast.success('Cadastro', {
                description: 'Cadastro realizado com sucesso!'
            })

            router.push('/')
        }
        
    })

    return{ data, isSuccess, mutate, error }
}