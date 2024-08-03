	.file	"vectImpl.cpp"
	.text
#APP
	.globl _ZSt21ios_base_library_initv
#NO_APP
	.section	.text._ZN3VecC2Ev,"axG",@progbits,_ZN3VecC5Ev,comdat
	.align 2
	.weak	_ZN3VecC2Ev
	.type	_ZN3VecC2Ev, @function
_ZN3VecC2Ev:
.LFB1983:
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	movq	%rdi, -8(%rbp)
	movq	-8(%rbp), %rax
	movq	%rax, %rdi
	call	_ZN3Vec7vec_funEv
	movq	-8(%rbp), %rdx
	movq	%rax, (%rdx)
	movq	-8(%rbp), %rax
	movl	$0, 8(%rax)
	movq	-8(%rbp), %rax
	movl	$1, 12(%rax)
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE1983:
	.size	_ZN3VecC2Ev, .-_ZN3VecC2Ev
	.weak	_ZN3VecC1Ev
	.set	_ZN3VecC1Ev,_ZN3VecC2Ev
	.section	.text._ZN3Vec7vec_funEv,"axG",@progbits,_ZN3Vec7vec_funEv,comdat
	.align 2
	.weak	_ZN3Vec7vec_funEv
	.type	_ZN3Vec7vec_funEv, @function
_ZN3Vec7vec_funEv:
.LFB1985:
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$32, %rsp
	movq	%rdi, -24(%rbp)
	movl	$4, %edi
	call	_Znam
	movq	%rax, -8(%rbp)
	movq	-8(%rbp), %rax
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE1985:
	.size	_ZN3Vec7vec_funEv, .-_ZN3Vec7vec_funEv
	.section	.text._ZN3Vec6resizeEv,"axG",@progbits,_ZN3Vec6resizeEv,comdat
	.align 2
	.weak	_ZN3Vec6resizeEv
	.type	_ZN3Vec6resizeEv, @function
_ZN3Vec6resizeEv:
.LFB1986:
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$32, %rsp
	movq	%rdi, -24(%rbp)
	movq	-24(%rbp), %rax
	movl	12(%rax), %eax
	addl	%eax, %eax
	cltq
	movabsq	$2305843009213693950, %rdx
	cmpq	%rax, %rdx
	jb	.L5
	salq	$2, %rax
	movq	%rax, %rdi
	call	_Znam
	movq	%rax, -16(%rbp)
	movl	$0, -4(%rbp)
	jmp	.L7
.L5:
	call	__cxa_throw_bad_array_new_length
.L8:
	movq	-24(%rbp), %rax
	movq	(%rax), %rax
	movl	-4(%rbp), %edx
	movslq	%edx, %rdx
	salq	$2, %rdx
	addq	%rdx, %rax
	movl	-4(%rbp), %edx
	movslq	%edx, %rdx
	leaq	0(,%rdx,4), %rcx
	movq	-16(%rbp), %rdx
	addq	%rcx, %rdx
	movl	(%rax), %eax
	movl	%eax, (%rdx)
	addl	$1, -4(%rbp)
.L7:
	movq	-24(%rbp), %rax
	movl	8(%rax), %eax
	cmpl	%eax, -4(%rbp)
	jl	.L8
	movq	-24(%rbp), %rax
	movl	12(%rax), %eax
	leal	(%rax,%rax), %edx
	movq	-24(%rbp), %rax
	movl	%edx, 12(%rax)
	movq	-24(%rbp), %rax
	movq	(%rax), %rax
	movq	%rax, %rdi
	call	free
	movq	-24(%rbp), %rax
	movq	-16(%rbp), %rdx
	movq	%rdx, (%rax)
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE1986:
	.size	_ZN3Vec6resizeEv, .-_ZN3Vec6resizeEv
	.section	.text._ZN3Vec4pushEi,"axG",@progbits,_ZN3Vec4pushEi,comdat
	.align 2
	.weak	_ZN3Vec4pushEi
	.type	_ZN3Vec4pushEi, @function
_ZN3Vec4pushEi:
.LFB1987:
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	movq	%rdi, -8(%rbp)
	movl	%esi, -12(%rbp)
	movq	-8(%rbp), %rax
	movl	8(%rax), %edx
	movq	-8(%rbp), %rax
	movl	12(%rax), %eax
	cmpl	%eax, %edx
	jne	.L10
	movq	-8(%rbp), %rax
	movq	%rax, %rdi
	call	_ZN3Vec6resizeEv
.L10:
	movl	-12(%rbp), %edx
	movq	-8(%rbp), %rax
	movq	(%rax), %rdi
	movq	-8(%rbp), %rax
	movl	8(%rax), %eax
	leal	1(%rax), %esi
	movq	-8(%rbp), %rcx
	movl	%esi, 8(%rcx)
	cltq
	salq	$2, %rax
	addq	%rdi, %rax
	movl	%edx, (%rax)
	nop
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE1987:
	.size	_ZN3Vec4pushEi, .-_ZN3Vec4pushEi
	.section	.rodata
.LC0:
	.string	" "
	.text
	.globl	main
	.type	main, @function
main:
.LFB1988:
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$32, %rsp
	leaq	-32(%rbp), %rax
	movq	%rax, %rdi
	call	_ZN3VecC1Ev
	leaq	-32(%rbp), %rax
	movl	$34, %esi
	movq	%rax, %rdi
	call	_ZN3Vec4pushEi
	leaq	-32(%rbp), %rax
	movl	$23, %esi
	movq	%rax, %rdi
	call	_ZN3Vec4pushEi
	leaq	-32(%rbp), %rax
	movl	$25, %esi
	movq	%rax, %rdi
	call	_ZN3Vec4pushEi
	leaq	-32(%rbp), %rax
	movl	$27, %esi
	movq	%rax, %rdi
	call	_ZN3Vec4pushEi
	leaq	-32(%rbp), %rax
	movl	$29, %esi
	movq	%rax, %rdi
	call	_ZN3Vec4pushEi
	leaq	-32(%rbp), %rax
	movl	$78, %esi
	movq	%rax, %rdi
	call	_ZN3Vec4pushEi
	movl	$0, -4(%rbp)
	jmp	.L12
.L13:
	movq	-32(%rbp), %rax
	movl	-4(%rbp), %edx
	movslq	%edx, %rdx
	salq	$2, %rdx
	addq	%rdx, %rax
	movl	(%rax), %eax
	movl	%eax, %esi
	movl	$_ZSt4cout, %edi
	call	_ZNSolsEi
	movl	$.LC0, %esi
	movq	%rax, %rdi
	call	_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc
	addl	$1, -4(%rbp)
.L12:
	movl	-24(%rbp), %eax
	cmpl	%eax, -4(%rbp)
	jl	.L13
	movl	$0, %eax
	leave
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE1988:
	.size	main, .-main
	.section	.rodata
	.type	_ZNSt8__detail30__integer_to_chars_is_unsignedIjEE, @object
	.size	_ZNSt8__detail30__integer_to_chars_is_unsignedIjEE, 1
_ZNSt8__detail30__integer_to_chars_is_unsignedIjEE:
	.byte	1
	.type	_ZNSt8__detail30__integer_to_chars_is_unsignedImEE, @object
	.size	_ZNSt8__detail30__integer_to_chars_is_unsignedImEE, 1
_ZNSt8__detail30__integer_to_chars_is_unsignedImEE:
	.byte	1
	.type	_ZNSt8__detail30__integer_to_chars_is_unsignedIyEE, @object
	.size	_ZNSt8__detail30__integer_to_chars_is_unsignedIyEE, 1
_ZNSt8__detail30__integer_to_chars_is_unsignedIyEE:
	.byte	1
	.ident	"GCC: (GNU) 13.1.1 20230614 (Red Hat 13.1.1-4)"
	.section	.note.GNU-stack,"",@progbits
