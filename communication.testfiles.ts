export const docBlob = `<SCL>
    <Communication>
        <SubNetwork name="SB" desc="someDesc" type="type">
            <BitRate unit="b/s" multiplier="M" >100</BitRate>
            <ConnectedAP iedName="ied1" apName="AP1" >
                <Address>
                </Address>
                <GSE ldInst="ldInst" cbName="gse1">
                    <Address>
                    </Address>
                    <MinTime unit="s" multiplier="m">10</MinTime>
                    <MaxTime unit="s" multiplier="m">10</MaxTime>
                </GSE>
            </ConnectedAP>
            <ConnectedAP iedName="ied3" apName="AP1" >
                <Address>
                </Address>
                <GSE ldInst="ldInst" cbName="gse3">
                    <Address>
                    </Address>
                    <MinTime unit="s" multiplier="m">10</MinTime>
                    <MaxTime unit="s" multiplier="m">10</MaxTime>
                </GSE>
            </ConnectedAP>
            <ConnectedAP iedName="ied2" apName="AP1" >
                <Address>
                </Address>
                <GSE ldInst="ldInst" cbName="gse2">
                    <Address>
                    </Address>
                    <MinTime unit="s" multiplier="m">10</MinTime>
                    <MaxTime unit="s" multiplier="m">10</MaxTime>
                </GSE>
            </ConnectedAP>
        </SubNetwork>
        <SubNetwork name="PB1">
            <BitRate ></BitRate>
            <ConnectedAP iedName="ied1" apName="AP2" >
                <Address>
                </Address>
                <SMV ldInst="ldInst" cbName="smv1">
                    <Address>
                    </Address>
                </SMV>
            </ConnectedAP>
        </SubNetwork>
        <SubNetwork name="PB2">
        </SubNetwork>
    </Communication>
</SCL>`;

export const missingCommunication = `<SCL>
    <Heading id="missing Communication" />
    <IED name="IED1" />
</SCL>`;

export const orphanSubNetwork = `<SubNetwork name="subNet">
            <ConnectedAP iedName="ied1" apName="AP1" >
                <Address>
                </Address>
                <GSE ldInst="ldInst" cbName="gse1">
                    <Address>
                    </Address>
                    <MinTime unit="s" multiplier="m">10</MinTime>
                    <MaxTime unit="s" multiplier="m">10</MaxTime>
                </GSE>
            </ConnectedAP></SubNetwork>`;
