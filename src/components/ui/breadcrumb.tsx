import { Breadcrumb, type SystemStyleObject } from "@chakra-ui/react"
import { Children, Fragment, forwardRef, isValidElement } from "react"

export type BreadcrumbRootProps = {
  separator?: React.ReactNode
  separatorGap?: SystemStyleObject["gap"]
} & Breadcrumb.RootProps

export const BreadcrumbRoot = forwardRef<HTMLDivElement, BreadcrumbRootProps>(
	function BreadcrumbRoot(props, ref) {
		const { separator, separatorGap, children, ...rest } = props
		const validChildren = Children.toArray(children).filter(isValidElement)
		return (
			<Breadcrumb.Root ref={ref} {...rest}>
				<Breadcrumb.List gap={separatorGap}>
					{validChildren.map((child, index) => {
						const last = index === validChildren.length - 1
						return (
							<Fragment key={index}>
								<Breadcrumb.Item>{child}</Breadcrumb.Item>
								{!last && (
									<Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
								)}
							</Fragment>
						)
					})}
				</Breadcrumb.List>
			</Breadcrumb.Root>
		)
	},
)

export const BreadcrumbLink = Breadcrumb.Link
export const BreadcrumbCurrentLink = Breadcrumb.CurrentLink
export const BreadcrumbEllipsis = Breadcrumb.Ellipsis
