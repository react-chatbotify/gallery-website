import { Blockquote as ChakraBlockquote } from "@chakra-ui/react"
import { forwardRef } from "react"

export type BlockquoteProps = {
  cite?: React.ReactNode
  citeUrl?: string
  icon?: React.ReactNode
  showDash?: boolean
} & ChakraBlockquote.RootProps

export const Blockquote = forwardRef<HTMLDivElement, BlockquoteProps>(
	function Blockquote(props, ref) {
		const { children, cite, citeUrl, showDash, icon, ...rest } = props

		return (
			<ChakraBlockquote.Root ref={ref} {...rest}>
				{icon}
				<ChakraBlockquote.Content cite={citeUrl}>
					{children}
				</ChakraBlockquote.Content>
				{cite && (
					<ChakraBlockquote.Caption>
						{showDash ? <>&mdash;</> : null} <cite>{cite}</cite>
					</ChakraBlockquote.Caption>
				)}
			</ChakraBlockquote.Root>
		)
	},
)

export const BlockquoteIcon = ChakraBlockquote.Icon
