import React, {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react'

type GlobalModalContextType = {
  promptLogin: boolean,
  setPromptLogin: React.Dispatch<React.SetStateAction<boolean>>
  promptError: string | null,
  setPromptError: React.Dispatch<React.SetStateAction<string | null>>
}

const GlobalModalContext = createContext<GlobalModalContextType | undefined>(undefined)

type GlobalModalProviderProps = {
  children: ReactNode
}

const GlobalModalProvider: React.FC<GlobalModalProviderProps> = ({ children }) => {
  // add more global toast states here if necessary
  const [promptLogin, setPromptLogin] = useState<boolean>(false);
  const [promptError, setPromptError] = useState<string | null>(null);

  return (
    <GlobalModalContext.Provider
      value={{
        promptLogin,
        setPromptLogin,
        promptError,
        setPromptError
      }}
    >
      {children}
    </GlobalModalContext.Provider>
  )
}

const useGlobalModal = (): GlobalModalContextType => {
  const context = useContext(GlobalModalContext)
  if (!context) {
    throw new Error('useGlobalModal must be used within an GlobalModalProvider')
  }
  return context
}

export {
  GlobalModalProvider,
  useGlobalModal
}
