import { Box, Button, Form, FormField, Text, TextInput } from "grommet";
import { errorAtom, formAtom, logged } from "../../store/store";

import { useAtom } from "jotai";

const LoginForm = () => {
  const [value, setValue] = useAtom(formAtom);
  const [error, setError] = useAtom(errorAtom);
  const [_, setUserLogged] = useAtom(logged);

  const handleSubmit = ({
    value,
  }: {
    value: { email: string; password: string };
  }) => {
    if (
      value.email === import.meta.env.VITE_EMAIL &&
      value.password === import.meta.env.VITE_PASSWORD
    ) {
      setError("");
      setUserLogged(true);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Box fill align="center" justify="center" flex="grow">
      <Box width="medium">
        <Form
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          onReset={() => setValue({ email: "", password: "" })}
          onSubmit={handleSubmit}
        >
          <FormField name="email" htmlFor="email-input" label="Email">
            <TextInput id="email-input" name="email" type="email" required />
          </FormField>
          <FormField
            name="password"
            htmlFor="password-input"
            label="Contraseña"
          >
            <TextInput
              id="password-input"
              name="password"
              type="password"
              required
            />
          </FormField>
          {error && (
            <Box pad={{ horizontal: "small" }}>
              <Text color="status-critical">{error}</Text>
            </Box>
          )}
          <Box
            direction="row"
            gap="medium"
            justify="between"
            pad={{ top: "medium" }}
          >
            <Button type="submit" primary label="Entrar" />
            <Button type="reset" label="Borrar" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default LoginForm;

// import { useAtom } from "jotai";
// import { atomWithStorage } from "jotai/utils";
// import { Box, Button, Form, FormField, TextInput, Text } from "grommet";

// // Create atoms for form state and error state
// const formAtom = atomWithStorage("loginForm", { email: "", password: "" });
// const errorAtom = atomWithStorage("loginError", "");

// const LoginForm = () => {
//   const [value, setValue] = useAtom(formAtom);
//   const [error, setError] = useAtom(errorAtom);

//   const handleSubmit = ({ value }) => {
//     // Perform login logic here
//     if (value.email === "test@example.com" && value.password === "password") {
//       alert("Login successful!");
//       setError("");
//     } else {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <Box fill align="center" justify="center">
//       <Box width="medium">
//         <Form
//           value={value}
//           onChange={(nextValue) => setValue(nextValue)}
//           onReset={() => setValue({ email: "", password: "" })}
//           onSubmit={handleSubmit}
//         >
//           <FormField name="email" htmlFor="email-input" label="Email">
//             <TextInput id="email-input" name="email" type="email" required />
//           </FormField>
//           <FormField
//             name="password"
//             htmlFor="password-input"
//             label="Contraseña"
//           >
//             <TextInput
//               id="password-input"
//               name="password"
//               type="password"
//               required
//             />
//           </FormField>
//           {error && (
//             <Box pad={{ horizontal: "small" }}>
//               <Text color="status-critical">{error}</Text>
//             </Box>
//           )}
//           <Box direction="row" gap="medium" pad={{ top: "medium" }}>
//             <Button type="submit" primary label="Entrar" />
//             <Button type="reset" label="Borrar" />
//           </Box>
//         </Form>
//       </Box>
//     </Box>
//   );
// };

// export default LoginForm;
