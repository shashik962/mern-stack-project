import { useAuth } from "../store/auth"

export const Service = () => {

    const { services } = useAuth();
    console.log("Service ", services);
    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>
            <div className="container grid grid-three-cols">
                {
                    services.map((curElem, index) => {
                        const {price, description, provider, service} = curElem;
                        return (
                            <div className="card" key={index}>
                                <div className="card-img">
                                    <img src="/images/design.png" alt="" width={100} height={100}/>
                                </div>
                                <div className="card-details">
                                    <div className="grid grid-two-cols">
                                        <p>{ provider }</p>
                                        <p>{ price }</p>
                                    </div>
                                    <h2>{ service }</h2>
                                    <p>{ description }</p>
                                </div>
                            </div>
                        );
                    })
                }
                
            </div>
        </section>
    )
}

