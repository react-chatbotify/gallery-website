
type ToggleButtonProps = {
  onChange: () => void;
  checked: boolean;
}

export default function ToggleButton(props : ToggleButtonProps) {
	return <label htmlFor="theme" className="theme" >
		<span className="theme__toggle-wrap">

			<input type="checkbox"  className="theme__toggle" id="theme" role="switch" {...props} />
			<span className="theme__fill"></span>
			<span className="theme__icon">
				<span className="theme__icon-part"></span>
				<span className="theme__icon-part"></span>
				<span className="theme__icon-part"></span>
				<span className="theme__icon-part"></span>
				<span className="theme__icon-part"></span>
				<span className="theme__icon-part"></span>
				<span className="theme__icon-part"></span>
				<span className="theme__icon-part"></span>
				<span className="theme__icon-part"></span>
    
			</span>
		</span>
	</label>
}