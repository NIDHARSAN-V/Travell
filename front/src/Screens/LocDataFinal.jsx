import { LoadScriptNext } from '@react-google-maps/api'
import React from 'react'
import LocData from './LocData'

function LocDataFinal() {
  return (
    <LoadScriptNext
    googleMapsApiKey="AIzaSyA4fnb5WG1XByxadWObBtvp8cz-ENaVHgc"
    libraries={["places"]} // Required for Autocomplete
  >
    <LocData />
  </LoadScriptNext>
  )
}

export default LocDataFinal
