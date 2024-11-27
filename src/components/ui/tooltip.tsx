import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react"
import { forwardRef } from "react"

export type TooltipProps = {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  content: React.ReactNode
  contentProps?: ChakraTooltip.ContentProps
  disabled?: boolean
} & ChakraTooltip.RootProps

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
	function Tooltip(props, ref) {
		const {
			showArrow,
			children,
			disabled,
			portalled,
			content,
			contentProps,
			portalRef,
			...rest
		} = props

		if (disabled) return children

		return (
			<ChakraTooltip.Root {...rest}>
				<ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
				<Portal disabled={!portalled} container={portalRef}>
					<ChakraTooltip.Positioner>
						<ChakraTooltip.Content ref={ref} {...contentProps}>
							{showArrow && (
								<ChakraTooltip.Arrow>
									<ChakraTooltip.ArrowTip />
								</ChakraTooltip.Arrow>
							)}
							{content}
						</ChakraTooltip.Content>
					</ChakraTooltip.Positioner>
				</Portal>
			</ChakraTooltip.Root>
		)
	},
)
