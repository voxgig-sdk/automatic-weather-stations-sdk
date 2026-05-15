package core

type AutomaticWeatherStationsError struct {
	IsAutomaticWeatherStationsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAutomaticWeatherStationsError(code string, msg string, ctx *Context) *AutomaticWeatherStationsError {
	return &AutomaticWeatherStationsError{
		IsAutomaticWeatherStationsError: true,
		Sdk:              "AutomaticWeatherStations",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AutomaticWeatherStationsError) Error() string {
	return e.Msg
}
