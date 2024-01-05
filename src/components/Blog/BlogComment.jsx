import React from 'react';
import './index.css';

const BlogComment = () => {
    return (
        <div className='mx-3' style={{ marginTop: '7rem' }}>
            <h5 className="mb-5" style={{ fontWeight: '900' }}>COMMENTS</h5>
            <div className='d-flex gap-3 mb-3'>
                <div>
                    {/* <Image src={userImage} width={80} className='' alt='user imge' /> */}
                </div>
                <div>
                    <div className='mb-2'>
                        <h6>Andrew Simon</h6>
                        <p className='form-text mb-0'>August 2023</p>
                    </div>
                    <p className='form-text'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur recusandae sed nemo illum distinctio minus enim hic eum saepe vel similique doloribus adipisci, autem deleniti dolores unde accusantium eos sequi aliquam, temporibus aspernatur iste! Necessitatibus, obcaecati architecto culpa illum fugiat delectus dolor, numquam autem quo suscipit impedit laboriosam id eos!
                    </p>
                </div>
            </div>

            <div className='d-flex gap-3 mb-3'>
                <div>
                    {/* <Image src={userImage} width={80} className='' alt='user imge' /> */}
                </div>
                <div>
                    <div className='mb-2'>
                        <h6>Andrew Simon</h6>
                        <p className='form-text mb-0'>August 2023</p>
                    </div>
                    <p className='form-text'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur recusandae sed nemo illum distinctio minus enim hic eum saepe vel similique doloribus adipisci, autem deleniti dolores unde accusantium eos sequi aliquam, temporibus aspernatur iste! Necessitatibus, obcaecati architecto culpa illum fugiat delectus dolor, numquam autem quo suscipit impedit laboriosam id eos!
                    </p>
                </div>
            </div>

            <div className='d-flex gap-3 mb-3'>
                <div>
                    {/* <Image src={userImage} width={80} className='' alt='user imge' /> */}
                </div>
                <div>
                    <div className='mb-2'>
                        <h6>Andrew Simon</h6>
                        <p className='form-text mb-0'>August 2023</p>
                    </div>
                    <p className='form-text'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur recusandae sed nemo illum distinctio minus enim hic eum saepe vel similique doloribus adipisci, autem deleniti dolores unde accusantium eos sequi aliquam, temporibus aspernatur iste! Necessitatibus, obcaecati architecto culpa illum fugiat delectus dolor, numquam autem quo suscipit impedit laboriosam id eos!
                    </p>
                </div>
            </div>


            <div className="mx-auto" style={{ marginTop: '7rem' }}>

                <form className='contactForm'>
                    <h6  style={{ fontWeight: '900' }}>POST A COMMENT</h6>
                    <div className="row">
                        <div className="col-6">
                            <input placeholder="Your Name" type="text" required />
                        </div>
                        <div className="col-6">
                            <input placeholder="Your Email" type="email" required />
                        </div>
                        <div className="col-12">
                            <input placeholder="Subject Optional" type="text" required />
                        </div>
                        <div className="col-12">
                            <textarea placeholder="Your Comment..." required></textarea>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Comment</button>
                </form>


            </div>
        </div>
    )
}

export default BlogComment