import { useEffect, useState } from 'react'
import { View, Text } from "react-native";
import { TextInput, Button } from 'react-native-paper'
import { styles } from '../assets/styles/allstyles'
import { useForm, Controller } from "react-hook-form"

export default function HomeScreen({ navigation, route }) {
    //Formulario que sera controlado por react-hook-form
    const {
        control,
        handleSubmit, reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            idEmployee: "",
            fullName: "",
            email: "",
            url: "",
            age: ""
        },
    })
    const onSubmit = (data) => console.log(data)
    return (
        <View style={styles.container}>
            <Text>Bienvenido usuario {route.params.email}</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                    maxLength: 12,
                    minLength: 6,
                    pattern:/^[0-9]+$/
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Identificación de empleado"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="idEmployee"
            />
            {errors.idEmployee?.type === "required" && <Text style={{ color: 'red' }}>La identificación es obligatoria</Text>}
            {errors.idEmployee?.type === "maxLength" && <Text style={{ color: 'red' }}>La identificación maximo debe tener máximo 12 caracteres</Text>}
            {errors.idEmployee?.type === "minLength" && <Text style={{ color: 'red' }}>La identificación maximo debe tener minimo 6 caracteres</Text>}
            {errors.idEmployee?.type === "pattern" && <Text style={{ color: 'red' }}>La identificación debe contener solo numeros</Text>}

            <Button
                style={{ marginTop: 20, backgroundColor: 'orange' }}
                icon="content-save-check-outline"
                mode="outlined"
                onPress={handleSubmit(onSubmit)}
            > Guardar
            </Button>
            <Button
                style={{ marginTop: 20, backgroundColor: 'powderblue' }}
                icon="backspace"
                mode="outlined"
                onPress={reset}
            > Limpiar datos
            </Button>
        </View>
    )
}