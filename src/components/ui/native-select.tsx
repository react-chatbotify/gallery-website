"use client"

import { NativeSelect as Select } from "@chakra-ui/react"
import { forwardRef, useMemo } from "react"

type NativeSelectRootProps = {
  icon?: React.ReactNode
} & Select.RootProps

export const NativeSelectRoot = forwardRef<
  HTMLDivElement,
  NativeSelectRootProps
>(function NativeSelect(props, ref) {
	const { icon, children, ...rest } = props
	return (
		<Select.Root ref={ref} {...rest}>
			{children}
			<Select.Indicator>{icon}</Select.Indicator>
		</Select.Root>
	)
})

type NativeSelectItem = {
  value: string
  label: string
  disabled?: boolean
}

type NativeSelectField = {
  items?: Array<string | NativeSelectItem>
} & Select.FieldProps

export const NativeSelectField = forwardRef<
  HTMLSelectElement,
  NativeSelectField
>(function NativeSelectField(props, ref) {
	const { items: itemsProp, children, ...rest } = props

	const items = useMemo(
		() =>
			itemsProp?.map((item) =>
				typeof item === "string" ? { label: item, value: item } : item,
			),
		[itemsProp],
	)

	return (
		<Select.Field ref={ref} {...rest}>
			{children}
			{items?.map((item) => (
				<option key={item.value} value={item.value} disabled={item.disabled}>
					{item.label}
				</option>
			))}
		</Select.Field>
	)
})
