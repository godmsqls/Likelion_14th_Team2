import './ConditionBox.css'

const yearTabs = [
    { value: '20-23', label: '20-23학번' },
    { value: '24', label: '24학번' },
    { value: '25', label: '25학번' },
    { value: '26', label: '26학번' },
]

export function ConditionBox({ selectedYear, onSelectYear }) {
    return (
        <section className='condition-box'>
            <div className='condition-box-tabs'>
                {yearTabs.map((year) => (
                    <button
                        type='button'
                        key={year.value}
                        className={
                            selectedYear === year.value
                                ? 'condition-box-tab active'
                                : 'condition-box-tab'
                        }
                        onClick={() => onSelectYear(year.value)}
                    >
                        {year.label}
                    </button>
                ))}
            </div>

            <div
                className={`condition-box-result condition-box-result--${selectedYear}`}
            />
        </section>
    )
}